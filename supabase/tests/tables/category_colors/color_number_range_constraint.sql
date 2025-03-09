BEGIN;
SELECT plan(3);

PREPARE invalid_red_color_insert AS
    INSERT INTO category_colors(name, red, green, blue)
    VALUES ('a', 256, 0, 0);

PREPARE invalid_green_color_insert AS
    INSERT INTO category_colors(name, red, green, blue)
    VALUES ('a', 0, 256, 0);

PREPARE invalid_blue_color_insert AS
    INSERT INTO category_colors(name, red, green, blue)
    VALUES ('a', 0, 0, 256);

SELECT throws_ok(
               'invalid_red_color_insert',
               '23514',
               'new row for relation "category_colors" violates check constraint "category_colors_red_check"',
               'It disallows insertion of a red color value outside of the range'
       );

SELECT throws_ok(
               'invalid_green_color_insert',
               '23514',
               'new row for relation "category_colors" violates check constraint "category_colors_green_check"',
               'It disallows insertion of a red color value outside of the range'
       );

SELECT throws_ok(
               'invalid_blue_color_insert',
               '23514',
               'new row for relation "category_colors" violates check constraint "category_colors_blue_check"',
               'It disallows insertion of a red color value outside of the range'
       );


SELECT finish();
ROLLBACK;