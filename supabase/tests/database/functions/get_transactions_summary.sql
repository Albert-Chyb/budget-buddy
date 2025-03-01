CREATE OR REPLACE FUNCTION test_get_transactions_summary()
RETURNS SETOF TEXT
LANGUAGE PLPGSQL
AS $$
DECLARE
    var_user_id UUID;
BEGIN
    INSERT INTO auth.users (id, email) VALUES (gen_random_uuid(), 'unit_tests@domain.com') RETURNING id INTO var_user_id;
    INSERT INTO category_types(id, name, is_expense) VALUES (100, 'Fake', FALSE), (101, 'Fake', TRUE);
    INSERT INTO categories(id, name, type_id, owner_id) VALUES (100, 'Fake', 100, var_user_id), (101, 'Fake', 101, var_user_id);
    INSERT INTO wallets(id, name, balance, owner_id) VALUES (100, 'Fake', 10000, var_user_id);

    INSERT INTO transactions(id, wallet_id, category_id, amount, owner_id) VALUES
        (100, 100, 100, 1, var_user_id),
        (101, 100, 100, 2, var_user_id),
        (102, 100, 101, 3, var_user_id),
        (103, 100, 101, 4, var_user_id);
    execute format('set request.jwt.claim.sub=%L', var_user_id);

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