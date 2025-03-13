BEGIN;
SELECT plan(1);

INSERT INTO auth.users(id, email)
VALUES ('1298f160-cd55-4564-b8e4-357b5e340ab3', 'unit@test.com');

INSERT INTO category_types(id, name, is_expense)
VALUES (100, 'aaa', FALSE);

INSERT INTO categories(id, name, type_id, owner_id)
VALUES (100, 'aaa', 100, '1298f160-cd55-4564-b8e4-357b5e340ab3');

INSERT INTO wallets(id, name, balance, owner_id)
VALUES (100, 'aaa', 100, '1298f160-cd55-4564-b8e4-357b5e340ab3');

PREPARE negative_amount_insert AS
    INSERT INTO transactions(id, wallet_id, category_id, amount, owner_id)
    VALUES (100, 100, 100, -1, '1298f160-cd55-4564-b8e4-357b5e340ab3');

SELECT throws_ok(
               'negative_amount_insert',
               '23514',
               'new row for relation "transactions" violates check constraint "transactions_amount_check"',
               'It should disallow negative amounts'
       );

SELECT finish();
ROLLBACK;