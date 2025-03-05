CREATE TABLE financial_statistics (
    owner_id UUID,
    wallet_id BIGINT,
    category_id BIGINT,
    "year" SMALLINT,
    "month" SMALLINT,
    sum BIGINT NOT NULL,

    CONSTRAINT p_key PRIMARY KEY (owner_id, wallet_id, category_id, "year", "month"),
    CONSTRAINT owner_id_f_key FOREIGN KEY (owner_id) REFERENCES auth.users(id),
    CONSTRAINT wallet_id_f_key FOREIGN KEY (wallet_id) REFERENCES wallets(id),
    CONSTRAINT category_id_f_key FOREIGN KEY (category_id) REFERENCES categories(id),

    CONSTRAINT four_digit_year CHECK ("year" BETWEEN 1000 AND 9999),
    CONSTRAINT month_between_1_and_12 CHECK ("month" BETWEEN 1 AND 12)
);

-- Row Level Security
ALTER TABLE financial_statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for users based on owner_id column"
ON financial_statistics
AS PERMISSIVE
FOR SELECT
TO authenticated
USING ( (SELECT auth.uid()) = owner_id );

CREATE POLICY "Disable INSERT operation"
ON financial_statistics
AS PERMISSIVE
FOR INSERT
TO authenticated
WITH CHECK (FALSE);

CREATE POLICY "Disable UPDATE operation"
ON financial_statistics
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (FALSE)
WITH CHECK (FALSE);

CREATE POLICY "Disable DELETE operation"
ON financial_statistics
AS PERMISSIVE
FOR DELETE
TO authenticated
USING (FALSE);

-- Functions
CREATE FUNCTION add_transaction_to_period(p_transaction transactions)
RETURNS VOID
LANGUAGE PLPGSQL
AS $$
BEGIN
    INSERT INTO financial_statistics(owner_id, wallet_id, category_id, "year", "month", sum)
    VALUES (
        (SELECT auth.uid()), 
        p_transaction.wallet_id,
        p_transaction.category_id,
        EXTRACT(YEAR FROM p_transaction.created_at)::SMALLINT,
        EXTRACT(MONTH FROM p_transaction.created_at)::SMALLINT,
        p_transaction.amount
    )
    ON CONFLICT ON CONSTRAINT p_key DO UPDATE
        SET sum = financial_statistics.sum + EXCLUDED.sum;
END;
$$;

CREATE FUNCTION remove_transaction_from_period(p_transaction transactions)
RETURNS VOID
LANGUAGE PLPGSQL
AS $$
DECLARE
    var_sum_after_removal BIGINT;
BEGIN
    
    UPDATE financial_statistics 
    SET sum = sum - p_transaction.amount 
    WHERE
        owner_id = (SELECT auth.uid()) AND
        wallet_id = p_transaction.wallet_id AND
        "year" = EXTRACT(YEAR FROM p_transaction.created_at) AND
        "month" = EXTRACT(MONTH FROM p_transaction.created_at)
    RETURNING sum INTO var_sum_after_removal;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Cannot remove the transaction from the statistics. The period was not found.';
    END IF;

    IF var_sum_after_removal = 0 THEN
        DELETE FROM financial_statistics
        WHERE
            owner_id = (SELECT auth.uid()) AND
            wallet_id = p_transaction.wallet_id AND
            "year" = EXTRACT(YEAR FROM p_transaction.created_at) AND
            "month" = EXTRACT(MONTH FROM p_transaction.created_at)
    END IF;
END;
$$;

-- Triggers
CREATE FUNCTION update_financial_statistics_on_transaction_insert()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
    -- Expected behavior
    -- It should create a new record if there isn't one with the transaction's amount
    -- It should add the transaction's amount to the sum

    PERFORM add_transaction_to_period(NEW);

    RETURN NEW;
END;
$$ SECURITY DEFINER;

CREATE TRIGGER update_financial_statistics_on_transaction_insert
AFTER INSERT 
ON transactions
FOR EACH ROW
EXECUTE PROCEDURE update_financial_statistics_on_transaction_insert();

CREATE FUNCTION update_financial_statistics_on_transaction_update()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
    -- Expected behavior
    -- It should deduct the transactions amount from the previous period (delete if sum is 0 after deletion)
    -- It should add the transactions amount to the new period (create if not exists)

    PERFORM remove_transaction_from_period(OLD);
    PERFORM add_transaction_to_period(NEW);

    RETURN NEW;
END;
$$ SECURITY DEFINER;

CREATE TRIGGER update_financial_statistics_on_transaction_update
AFTER UPDATE 
ON transactions
FOR EACH ROW
EXECUTE PROCEDURE update_financial_statistics_on_transaction_update();

CREATE FUNCTION update_financial_statistics_on_transaction_delete()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
    -- Expected behavior
    -- It deducts the transaction's amount from the financial period
    -- It removes the financial record from the table if the period does not contains any transactions

    PERFORM remove_transaction_from_period(OLD);

    RETURN OLD;
END;
$$ SECURITY DEFINER;

CREATE TRIGGER update_financial_statistics_on_transaction_delete
AFTER DELETE 
ON transactions
FOR EACH ROW
EXECUTE PROCEDURE update_financial_statistics_on_transaction_delete();