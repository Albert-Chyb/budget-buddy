alter table "public"."categories" drop constraint "categories_parent_category_fkey";

alter table "public"."categories" drop column "parent_category";

alter table "public"."categories" add column "parent_category_id" bigint;

alter table "public"."categories" add constraint "categories_parent_category_id_fkey" FOREIGN KEY (parent_category_id) REFERENCES categories(id) ON DELETE CASCADE not valid;

alter table "public"."categories" validate constraint "categories_parent_category_id_fkey";



