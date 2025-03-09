BEGIN;
SELECT plan(2);

PREPARE too_small_name_insert AS
    INSERT INTO category_types(name, is_expense)
    VALUES ('', FALSE);

PREPARE too_big_name_insert AS
    INSERT INTO category_types(name, is_expense)
    VALUES ('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', FALSE);

SELECT throws_ok(
               'too_small_name_insert',
               '23514',
               'new row for relation "category_types" violates check constraint "category_types_name_check"',
               'It should disallow to insert a name that is too short'
       );

SELECT throws_ok(
               'too_big_name_insert',
               '23514',
               'new row for relation "category_types" violates check constraint "category_types_name_check"',
               'It should disallow to insert a name that is too long'
       );

SELECT finish();
ROLLBACK;