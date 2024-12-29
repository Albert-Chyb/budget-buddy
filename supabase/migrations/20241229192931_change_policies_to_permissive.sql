drop policy "Allow access for users based on owner_id" on "public"."categories";

drop policy "Enable read access for authenticated users only" on "public"."category_colors";

drop policy "Enable read access for authenticated users only" on "public"."category_types";

create policy "Enable access for users based on owner_id"
on "public"."categories"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = owner_id))
with check ((( SELECT auth.uid() AS uid) = owner_id));


create policy "Enable read access for authenticated users only"
on "public"."category_colors"
as permissive
for select
to authenticated
using (true);


create policy "Enable read access for authenticated users only"
on "public"."category_types"
as permissive
for select
to authenticated
using (true);




