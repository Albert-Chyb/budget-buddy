BEGIN;
SELECT plan(2);

INSERT INTO auth.users(id, email)
VALUES ('1298f160-cd55-4564-b8e4-357b5e340ab3', 'unit@tests.com');

PREPARE too_short_name_insert AS
    INSERT INTO wallets(name, balance, owner_id)
    VALUES ('', 0, '1298f160-cd55-4564-b8e4-357b5e340ab3');

SELECT throws_ok(
               'too_short_name_insert',
               '23514',
               'new row for relation "wallets" violates check constraint "wallets_name_check"',
               'It should disallow to insert too short name'
       );

PREPARE too_long_name_insert AS
    INSERT INTO wallets(name, balance, owner_id)
    VALUES ('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 0, '1298f160-cd55-4564-b8e4-357b5e340ab3');

SELECT throws_ok(
               'too_long_name_insert',
               '23514',
               'new row for relation "wallets" violates check constraint "wallets_name_check"',
               'It should disallow to insert too long name'
       );

SELECT finish();
ROLLBACK;