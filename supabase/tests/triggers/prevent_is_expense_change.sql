BEGIN;
SELECT plan(1);

INSERT INTO auth.users(id, email)
VALUES ('1298f160-cd55-4564-b8e4-357b5e340ab3', 'tests@unit.com');

SET LOCAL request.jwt.claim.sub = '1298f160-cd55-4564-b8e4-357b5e340ab3';

INSERT INTO category_types (id, name, is_expense)
VALUES  (100, 'aaa', FALSE);

INSERT INTO categories (name, type_id, owner_id)
VALUES ('aaa', 100, '1298f160-cd55-4564-b8e4-357b5e340ab3');

PREPARE illegal_is_expense_change AS
    UPDATE category_types SET is_expense = TRUE WHERE id = 100;

SELECT throws_ok(
               'illegal_is_expense_change',
               '23505',
               'Cannot change the value of the is_expense column while referenced by a category',
               'It should prevent changing the value of the is_expense column if a category has a reference to this value'
       );

SELECT finish();
ROLLBACK;