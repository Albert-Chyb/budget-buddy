CREATE OR REPLACE FUNCTION is_transaction_expense(transaction_id transactions.id%TYPE)
RETURNS bool
LANGUAGE PLPGSQL
AS $$
DECLARE
    p_is_expense category_types.is_expense%TYPE;
BEGIN
    SELECT
        is_expense
    INTO
        p_is_expense
    FROM
        transactions
    JOIN
        categories
            ON transactions.category_id = categories.id
    JOIN
        category_types
            ON categories.type_id = category_types.id
    WHERE
        transactions.id = transaction_id;

    RETURN p_is_expense;
END;
$$;

CREATE OR REPLACE FUNCTION insert_transaction_to_wallet(
    transaction_id transactions.id%TYPE,
    wallet_id wallets.id%TYPE,
    amount transactions.amount%TYPE
)
RETURNS VOID
LANGUAGE PLPGSQL
AS $$
BEGIN
    IF is_transaction_expense(transaction_id) THEN
        UPDATE wallets SET balance = balance - amount WHERE id = wallet_id;
    ELSE
        UPDATE wallets SET balance = balance + amount WHERE id = wallet_id;
    END IF;
END;
$$;

CREATE OR REPLACE FUNCTION remove_transaction_from_wallet(
    transaction_id transactions.id%TYPE,
    wallet_id wallets.id%TYPE,
    amount transactions.amount%TYPE
)
    RETURNS VOID
    LANGUAGE PLPGSQL
AS $$
BEGIN
    IF is_transaction_expense(transaction_id) THEN
        UPDATE wallets SET balance = balance + amount WHERE id = wallet_id;
    ELSE
        UPDATE wallets SET balance = balance - amount WHERE id = wallet_id;
    END IF;
END;
$$;

CREATE OR REPLACE FUNCTION update_wallet_balance_after_transaction_delete()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
    PERFORM remove_transaction_from_wallet(OLD.id, OLD.wallet_id, OLD.amount);
    RETURN OLD;
END;
$$;

CREATE OR REPLACE TRIGGER update_wallet_balance_after_transaction_delete
BEFORE DELETE
ON transactions
FOR EACH ROW
EXECUTE PROCEDURE update_wallet_balance_after_transaction_delete();

CREATE OR REPLACE FUNCTION update_wallet_balance_after_transaction_update()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
    IF OLD.amount = NEW.amount AND OLD.wallet_id = NEW.wallet_id THEN
        RETURN NEW;
    END IF;

    PERFORM remove_transaction_from_wallet(OLD.id, OLD.wallet_id, OLD.amount);
    PERFORM insert_transaction_to_wallet(NEW.id, NEW.wallet_id, NEW.amount);

    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER update_wallet_balance_after_transaction_update
AFTER UPDATE
ON transactions
FOR EACH ROW
EXECUTE PROCEDURE update_wallet_balance_after_transaction_update();

CREATE OR REPLACE FUNCTION update_wallet_balance_after_transaction_create()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
    PERFORM insert_transaction_to_wallet(NEW.id, NEW.wallet_id, NEW.amount);

    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER update_wallet_balance_after_transaction_create
AFTER INSERT
ON transactions
FOR EACH ROW
EXECUTE PROCEDURE update_wallet_balance_after_transaction_create();