CREATE OR REPLACE FUNCTION test_get_transactions_summary()
RETURNS SETOF TEXT
LANGUAGE PLPGSQL
AS $$
DECLARE
    var_user_id UUID;
    var_incomes_category_type_id category_types.id%TYPE;
    var_expenses_category_type_id category_types.id%TYPE;
    var_incomes_category_id categories.id%TYPE;
    var_expenses_category_id categories.id%TYPE;
    var_wallet_id wallets.id%TYPE;
BEGIN
    INSERT INTO auth.users (id, email) VALUES (gen_random_uuid(), 'unit_tests@domain.com') RETURNING id INTO var_user_id;

    INSERT INTO category_types(name, is_expense) VALUES ('Fake', FALSE) RETURNING id INTO var_incomes_category_type_id;
    INSERT INTO category_types(name, is_expense) VALUES ('Fake', TRUE) RETURNING id INTO var_expenses_category_type_id;
    
    INSERT INTO categories(name, type_id, owner_id) VALUES ('Fake', var_incomes_category_type_id, var_user_id) RETURNING id INTO var_incomes_category_id;
    INSERT INTO categories(name, type_id, owner_id) VALUES ('Fake', var_expenses_category_type_id, var_user_id) RETURNING id INTO var_expenses_category_id;
    
    INSERT INTO wallets(name, balance, owner_id) VALUES ('Fake', 10000, var_user_id) RETURNING id INTO var_wallet_id;

    INSERT INTO transactions(wallet_id, category_id, amount, owner_id) VALUES
        (var_wallet_id, var_incomes_category_id, 1, var_user_id),
        (var_wallet_id, var_incomes_category_id, 2, var_user_id),
        (var_wallet_id, var_expenses_category_id, 3, var_user_id),
        (var_wallet_id, var_expenses_category_id, 4, var_user_id);
    EXECUTE format('set request.jwt.claim.sub=%L', var_user_id);

    RETURN NEXT results_eq(
        'SELECT is_expense, sum FROM get_transactions_summary() ORDER BY is_expense',
        'VALUES (FALSE, 3::BIGINT), (TRUE, 7::BIGINT)',
        'get_transactions_summary() correctly cums up expenses and incomes'
    );
END $$;

BEGIN;
SELECT plan(1);
SELECT test_get_transactions_summary();
SELECT finish();
ROLLBACK;

DROP FUNCTION test_get_transactions_summary;