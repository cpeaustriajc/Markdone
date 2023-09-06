create policy "Enable read access for all users"
on "public"."drafts"
as permissive
for select
to public
using (true);



