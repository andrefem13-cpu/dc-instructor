-- DC Instructor — drop the unused generations.rating column
--
-- 001 created generations.rating, but nothing ever wrote to it: logGeneration()
-- does not set it, and the UI records feedback through the ratings table instead.
-- Verified 0 non-null values out of 158 rows on 2026-08-31 before writing this.
--
-- The guard below aborts rather than destroying data if that ever stops being
-- true — so this stays safe to run even if the column gets wired up later.

do $$
declare
  populated int;
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'generations' and column_name = 'rating'
  ) then
    raise notice 'generations.rating already dropped — nothing to do';
    return;
  end if;

  select count(*) into populated from generations where rating is not null;

  if populated > 0 then
    raise exception 'generations.rating has % non-null row(s); refusing to drop', populated;
  end if;

  alter table generations drop column rating;
  raise notice 'dropped generations.rating';
end $$;
