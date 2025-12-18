-- Create comments table for project discussions
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.comments enable row level security;

-- RLS Policies
create policy "Users can view comments on their projects"
  on public.comments for select
  using (
    exists (
      select 1 from public.projects
      where projects.id = comments.project_id
      and projects.client_id = auth.uid()
    )
  );

create policy "Users can create comments on their projects"
  on public.comments for insert
  with check (
    exists (
      select 1 from public.projects
      where projects.id = comments.project_id
      and projects.client_id = auth.uid()
    )
    and user_id = auth.uid()
  );

-- Create index for faster queries
create index comments_project_id_idx on public.comments(project_id);
create index comments_created_at_idx on public.comments(created_at desc);
