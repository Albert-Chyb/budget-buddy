alter table "public"."transactions" add constraint "transactions_description_check" CHECK (((length(description) >= 1) AND (length(description) <= 64))) not valid;

alter table "public"."transactions" validate constraint "transactions_description_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_transaction_expense(transaction_id bigint)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    p_is_expense category_types.is_expense%TYPE;
BEGIN
    SELECT
        is_expense
    INTO
        p_is_expense
    FROM
        transactions
            JOIN
        categories
        ON transactions.category_id = categories.id
            JOIN
        category_types
        ON categories.type_id = category_types.id
    WHERE
        transactions.id = transaction_id;

    RETURN p_is_expense;
END;
$function$
;


