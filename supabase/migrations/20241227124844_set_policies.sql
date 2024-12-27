alter table "public"."categories" enable row level security;

alter table "public"."category_colors" enable row level security;

alter table "public"."category_types" enable row level security;

create policy "Allow access for users based on owner_id"
on "public"."categories"
as restrictive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = owner_id))
with check ((( SELECT auth.uid() AS uid) = owner_id));


create policy "Enable read access for authenticated users only"
on "public"."category_colors"
as restrictive
for select
to authenticated
using (true);


create policy "Enable read access for authenticated users only"
on "public"."category_types"
as restrictive
for select
to authenticated
using (true);