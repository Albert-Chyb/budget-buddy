BEGIN;
SELECT plan(1);

INSERT INTO auth.users(id, email)
VALUES ('1298f160-cd55-4564-b8e4-357b5e340ab3', 'unit@tests.com');

PREPARE negative_balance_insert AS
    INSERT INTO wallets(name, balance, owner_id)
    VALUES ('a', -1, '1298f160-cd55-4564-b8e4-357b5e340ab3');

SELECT throws_ok(
               'negative_balance_insert',
               '23514',
               'new row for relation "wallets" violates check constraint "wallets_balance_check"',
               'It should disallow to insert a negative balance'
       );

SELECT finish();
ROLLBACK;