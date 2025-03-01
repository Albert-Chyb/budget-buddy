CREATE OR REPLACE FUNCTION get_transactions_summary()
RETURNS TABLE (
    is_expense category_types.is_expense%TYPE,
    sum BIGINT
)
LANGUAGE PLPGSQL
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        category_types.is_expense,
        SUM(transactions.amount)::BIGINT AS sum
    FROM
        transactions
    JOIN
        categories
            ON transactions.category_id = categories.id
    JOIN
        category_types
            ON categories.type_id = category_types.id
    WHERE
        transactions.owner_id = (SELECT auth.uid())
    GROUP BY
        category_types.is_expense;
END;
$$;