-- Create project_files table for file uploads and deliverables
create table if not exists public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  uploaded_by uuid not null references auth.users(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  file_size integer,
  file_type text not null check (file_type in ('reference', 'deliverable', 'revision')),
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.project_files enable row level security;

-- RLS Policies - users can view files for their projects
create policy "Users can view files for their projects"
  on public.project_files for select
  using (
    exists (
      select 1 from public.projects
      where projects.id = project_files.project_id
      and projects.client_id = auth.uid()
    )
  );

create policy "Users can upload files to their projects"
  on public.project_files for insert
  with check (
    exists (
      select 1 from public.projects
      where projects.id = project_files.project_id
      and projects.client_id = auth.uid()
    )
    and uploaded_by = auth.uid()
  );

-- Create index for faster queries
create index project_files_project_id_idx on public.project_files(project_id);
