BEGIN;
SELECT plan(2);

PREPARE too_short_name_insert AS
    INSERT INTO category_colors(name, red, green, blue)
    VALUES ('', 0, 0, 0);

SELECT throws_ok(
               'too_short_name_insert',
               '23514',
               'new row for relation "category_colors" violates check constraint "category_colors_name_check"',
               'It disallow insertion of a name that is too short'
       );

PREPARE too_long_name_insert AS
    INSERT INTO category_colors(name, red, green, blue)
    VALUES ('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 0, 0, 0);

SELECT throws_ok(
               'too_long_name_insert',
               '23514',
               'new row for relation "category_colors" violates check constraint "category_colors_name_check"',
               'It disallow insertion of a name that is too long'
       );

SELECT finish();
ROLLBACK;