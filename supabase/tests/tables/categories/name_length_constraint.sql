BEGIN;
SELECT plan(2);

INSERT INTO auth.users(id, email)
VALUES ('1298f160-cd55-4564-b8e4-357b5e340ab3', 'tests@unit.com');
INSERT INTO category_types(id, name, is_expense)
VALUES (100, 'a', FALSE);

PREPARE too_short_name_insert AS
    INSERT INTO categories(name, type_id, owner_id)
    VALUES ('', 100, '1298f160-cd55-4564-b8e4-357b5e340ab3');

PREPARE too_long_name_insert AS
    INSERT INTO categories(name, type_id, owner_id)
    VALUES ('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 100,
            '1298f160-cd55-4564-b8e4-357b5e340ab3');

SELECT throws_ok(
               'too_short_name_insert',
               '23514',
               'new row for relation "categories" violates check constraint "categories_name_check"',
               'It should disallow to insert a name that is too short'
       );

SELECT throws_ok(
               'too_long_name_insert',
               '23514',
               'new row for relation "categories" violates check constraint "categories_name_check"',
               'It should disallow to insert a name that is too long'
       );

SELECT finish();
ROLLBACK;