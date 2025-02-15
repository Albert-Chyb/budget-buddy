CREATE OR REPLACE FUNCTION generate_fake_transaction(
    p_is_expense BOOLEAN,
    p_transaction_amount transactions.amount%TYPE,
    p_wallet_balance wallets.balance%TYPE
)
    RETURNS VOID
    LANGUAGE PLPGSQL
AS
$$
BEGIN
    CREATE TEMPORARY TABLE generated_transaction_info
    (
        id               int,
        user_id          uuid,
        category_type_id bigint,
        category_id      bigint,
        wallet_id        bigint,
        transaction_id   bigint
    ) ON COMMIT DROP;
    INSERT INTO generated_transaction_info(id) VALUES (1);

    WITH fake_user AS (
        INSERT INTO auth.users (id, email) VALUES (gen_random_uuid(), 'example@domain.com') RETURNING id)
    UPDATE generated_transaction_info
    SET user_id = (SELECT id FROM fake_user);

    WITH category_type AS (
        INSERT INTO category_types (name, is_expense) VALUES ('Fake category type', p_is_expense) RETURNING id)
    UPDATE generated_transaction_info
    SET category_type_id = (SELECT id FROM category_type);

    WITH category AS (
        INSERT INTO categories (name, type_id, owner_id)
            SELECT 'Fake category', category_type_id, user_id FROM generated_transaction_info
            RETURNING id)
    UPDATE generated_transaction_info
    SET category_id = (SELECT id FROM category);

    WITH wallet AS (
        INSERT INTO wallets (name, balance, owner_id)
            SELECT 'Fake wallet', p_wallet_balance * 100, user_id FROM generated_transaction_info
            RETURNING id)
    UPDATE generated_transaction_info
    SET wallet_id = (SELECT id FROM wallet);

    WITH transaction AS (
        INSERT INTO transactions (wallet_id, category_id, amount, owner_id)
            SELECT wallet_id, category_id, p_transaction_amount * 100, user_id FROM generated_transaction_info
            RETURNING id)
    UPDATE generated_transaction_info
    SET transaction_id = (SELECT id FROM transaction);
END;
$$;

BEGIN;
    SELECT plan(10);

    SAVEPOINT before_all;

    -- Delete income transaction
    SELECT generate_fake_transaction(FALSE, 1, 10);
    DELETE FROM transactions WHERE id = (SELECT transaction_id FROM generated_transaction_info);
    SELECT results_eq(
                   format('SELECT balance FROM wallets WHERE id = %s', (SELECT wallet_id FROM generated_transaction_info)),
                   ARRAY [ (10 * 100)::bigint ],
                   'After deleting an income transaction its amount should be deducted from the referenced wallet balance'
           );

    ROLLBACK TO SAVEPOINT before_all;

    -- DELETE expense transaction
    SELECT generate_fake_transaction(TRUE, 1, 10);
    DELETE FROM transactions WHERE id = (SELECT transaction_id FROM generated_transaction_info);
    SELECT results_eq(
                   format('SELECT balance FROM wallets WHERE id = %s', (SELECT wallet_id FROM generated_transaction_info)),
                   ARRAY [ (10 * 100)::bigint ],
                   'After deleting an expense transaction its amount should be returned to the referenced wallet balance'
           );

    ROLLBACK TO SAVEPOINT before_all;

    -- Insert income transaction
    SELECT generate_fake_transaction(FALSE, 1, 10);
    SELECT results_eq(
                   format('SELECT balance FROM wallets WHERE id = %s', (SELECT wallet_id FROM generated_transaction_info)),
                   ARRAY [(11 * 100)::bigint],
                   'After inserting an income transaction its amount should be added to the referenced wallet balance'
           );

    ROLLBACK TO SAVEPOINT before_all;

    -- Insert expense transaction
    SELECT generate_fake_transaction(TRUE, 1, 10);
    SELECT results_eq(
                   format('SELECT balance FROM wallets WHERE id = %s', (SELECT wallet_id FROM generated_transaction_info)),
                   ARRAY [ (9 * 100)::bigint ],
                   'After inserting an expense transaction its amount should be deducted from the referenced wallet balance'
           );

    ROLLBACK TO SAVEPOINT before_all;

    -- =========== Update income transaction ===========
    -- Change a value in the 'amount' column
    SELECT generate_fake_transaction(FALSE, 1, 10);
    UPDATE transactions SET amount = 5 * 100 WHERE id = (SELECT transaction_id FROM generated_transaction_info);
    SELECT results_eq(
                   format('SELECT balance FROM wallets WHERE id = %s', (SELECT wallet_id FROM generated_transaction_info)),
                   ARRAY [(15 * 100)::bigint],
                   'After updating an income transaction amount, the old amount should be deducted from the referenced wallet ' ||
                   'and the new amount should be added to it'
           );

    ROLLBACK TO SAVEPOINT before_all;

    -- Change a value in the 'wallet_id' column
    CREATE TEMPORARY TABLE temp_table(
        id int,
        second_wallet_id bigint
    ) ON COMMIT DROP;
    INSERT INTO temp_table(id) VALUES (1);

    SELECT generate_fake_transaction(FALSE, 1, 10);
    WITH second_wallet AS (
        INSERT INTO wallets(name, balance, owner_id)
            SELECT 'Fake wallet 2', 15 * 100, user_id FROM generated_transaction_info
        RETURNING id
    )
    UPDATE temp_table SET second_wallet_id = (SELECT id FROM second_wallet);
    UPDATE transactions SET wallet_id = (SELECT second_wallet_id FROM temp_table) WHERE id = (SELECT transaction_id FROM generated_transaction_info);

    SELECT results_eq(
                format('SELECT balance FROM wallets WHERE id = %s', (SELECT wallet_id FROM generated_transaction_info)),
                ARRAY [ (10 * 100)::bigint ],
                'After updating a wallet_id column of an income transaction, its amount should be deducted from previous wallet balance'
            );
    SELECT results_eq(
               format('SELECT balance FROM wallets WHERE id = %s', (SELECT second_wallet_id FROM temp_table)),
               ARRAY [ (16 * 100)::bigint ],
               'After updating a wallet_id column of an income transaction, its amount should be added to the new wallet balance'
        );

    ROLLBACK TO SAVEPOINT before_all;

    -- =========== Update expense transaction ===========
    -- Change value in the amount column
    SELECT generate_fake_transaction(TRUE, 1, 10);
    UPDATE transactions SET amount = 5 * 100 WHERE id = (SELECT transaction_id FROM generated_transaction_info);
    SELECT results_eq(
                   format('SELECT balance FROM wallets WHERE id = %s', (SELECT wallet_id FROM generated_transaction_info)),
                   ARRAY [(5 * 100)::bigint],
                   'After updating an expense transaction amount, the old amount should added to the referenced wallet ' ||
                   'and the new amount should be deducted from it'
           );

    ROLLBACK TO SAVEPOINT before_all;

    -- Change value in the wallet_id column
    CREATE TEMPORARY TABLE temp_table(
                                         id int,
                                         second_wallet_id bigint
    ) ON COMMIT DROP;
    INSERT INTO temp_table(id) VALUES (1);

    SELECT generate_fake_transaction(TRUE, 1, 10);
    WITH second_wallet AS (
        INSERT INTO wallets(name, balance, owner_id)
            SELECT 'Fake wallet 2', 15 * 100, user_id FROM generated_transaction_info
            RETURNING id
    )
    UPDATE temp_table SET second_wallet_id = (SELECT id FROM second_wallet);
    UPDATE transactions SET wallet_id = (SELECT second_wallet_id FROM temp_table) WHERE id = (SELECT transaction_id FROM generated_transaction_info);

    SELECT results_eq(
                   format('SELECT balance FROM wallets WHERE id = %s', (SELECT wallet_id FROM generated_transaction_info)),
                   ARRAY [ (10 * 100)::bigint ],
                   'After updating a wallet_id column of an expense transaction, its amount should be added to the previous wallet balance'
           );
    SELECT results_eq(
                   format('SELECT balance FROM wallets WHERE id = %s', (SELECT second_wallet_id FROM temp_table)),
                   ARRAY [ (14 * 100)::bigint ],
                   'After updating a wallet_id column of an income transaction, its amount should be deducted from the new wallet balance'
           );

    SELECT finish();
ROLLBACK;

