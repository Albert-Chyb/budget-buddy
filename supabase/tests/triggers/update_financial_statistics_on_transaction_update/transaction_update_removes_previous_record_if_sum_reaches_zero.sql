BEGIN;
SELECT plan(1);

INSERT INTO auth.users(id, email)
VALUES ('1298f160-cd55-4564-b8e4-357b5e340ab3', 'unit@tests.com');
SET LOCAL request.jwt.claim.sub = '1298f160-cd55-4564-b8e4-357b5e340ab3';

INSERT INTO category_types(id, "name", is_expense)
VALUES (100, 'aaa', FALSE);

INSERT INTO categories(id, type_id, "name", owner_id)
VALUES (100, 100, 'aaaa', '1298f160-cd55-4564-b8e4-357b5e340ab3');

INSERT INTO categories(id, type_id, "name", owner_id)
VALUES (101, 100, 'aaaa', '1298f160-cd55-4564-b8e4-357b5e340ab3');

INSERT INTO wallets(id, "name", balance, owner_id)
VALUES (100, 'aaaa', 100, '1298f160-cd55-4564-b8e4-357b5e340ab3');

INSERT INTO financial_statistics(owner_id, wallet_id, category_id, year, month, sum)
VALUES ('1298f160-cd55-4564-b8e4-357b5e340ab3', 100, 101, 2024, 1, 15);

SET LOCAL ROLE authenticated;

INSERT INTO transactions(id, wallet_id, category_id, amount, owner_id, created_at)
VALUES (100, 100, 100, 15, '1298f160-cd55-4564-b8e4-357b5e340ab3', '2024-01-01');

UPDATE transactions
SET category_id = 101
WHERE id = 100;

SELECT results_eq(
    '
        SELECT COUNT(*) FROM financial_statistics
        WHERE
            owner_id = ''1298f160-cd55-4564-b8e4-357b5e340ab3'' AND
            wallet_id = 100 AND
            category_id = 100 AND
            year = 2024 AND
            month = 1;
    ',
    ARRAY [ 0::BIGINT ],
    'Checks that when a transaction is updated and its previous aggregation record''s sum reaches zero, the record is removed.'
);

SELECT * FROM finish();
ROLLBACK;
