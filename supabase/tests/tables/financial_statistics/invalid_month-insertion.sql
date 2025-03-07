BEGIN;
SELECT plan(1);

INSERT INTO auth.users(id, email)
VALUES ('1298f160-cd55-4564-b8e4-357b5e340ab3', 'unit@tests.com');
SET LOCAL request.jwt.claim.sub = '1298f160-cd55-4564-b8e4-357b5e340ab3';

INSERT INTO category_types(id, "name", is_expense)
VALUES (100, 'aaa', FALSE);

INSERT INTO categories(id, type_id, "name", owner_id)
VALUES (100, 100, 'aaaa', '1298f160-cd55-4564-b8e4-357b5e340ab3');

INSERT INTO wallets(id, "name", balance, owner_id)
VALUES (100, 'aaaa', 100, '1298f160-cd55-4564-b8e4-357b5e340ab3');

PREPARE insert_with_invalid_month AS
INSERT INTO financial_statistics(owner_id, wallet_id, category_id, year, month, sum)
VALUES ('1298f160-cd55-4564-b8e4-357b5e340ab3', 100, 100, 2024, 13, 1);

SELECT throws_ok(
    'insert_with_invalid_month',
    '23514',
    'new row for relation "financial_statistics" violates check constraint "month_between_1_and_12"',
    'It should throw an error if attempted to insert a month outside of 1-12 range (inclusive)'
);

SELECT finish();
ROLLBACK;