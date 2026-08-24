alter table public.classroom_comments
add column if not exists parent_comment_id bigint
references public.classroom_comments (id) on delete cascade;

create index if not exists classroom_comments_parent_created_idx
on public.classroom_comments (parent_comment_id, created_at);
