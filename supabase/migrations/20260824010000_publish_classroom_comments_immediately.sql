alter table public.classroom_comments
alter column approved set default true;

drop policy if exists "Anyone can submit a classroom comment"
on public.classroom_comments;

create policy "Anyone can submit a classroom comment"
on public.classroom_comments for insert to anon, authenticated
with check (approved = true);
