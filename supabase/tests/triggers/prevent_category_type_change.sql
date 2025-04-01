BEGIN;
SELECT plan(1);

INSERT INTO auth.users(id, email)
VALUES ('1298f160-cd55-4564-b8e4-357b5e340ab3', 'tests@unit.com');

SET LOCAL request.jwt.claim.sub = '1298f160-cd55-4564-b8e4-357b5e340ab3';

INSERT INTO category_types(id, name, is_expense)
VALUES (100, 'a', FALSE);

INSERT INTO category_types(id, name, is_expense)
VALUES (101, 'a', FALSE);

INSERT INTO categories(id, name, type_id, owner_id)
VALUES (100, 'aaaa', 100, '1298f160-cd55-4564-b8e4-357b5e340ab3');

INSERT INTO wallets(id, name, balance, owner_id)
VALUES (100, 'aaa', 10000, '1298f160-cd55-4564-b8e4-357b5e340ab3');

INSERT INTO transactions(wallet_id, category_id, amount, owner_id)
VALUES (100, 100, 1, '1298f160-cd55-4564-b8e4-357b5e340ab3');

PREPARE illegal_category_type_change AS
    UPDATE categories SET type_id = 101 WHERE id = 100;

SELECT throws_ok(
               'illegal_category_type_change',
               '23505',
               'Cannot change category type while referenced by a transaction',
               'It should disallow to change the type id if the category is referenced by a transaction'
       );

SELECT finish();
ROLLBACK;