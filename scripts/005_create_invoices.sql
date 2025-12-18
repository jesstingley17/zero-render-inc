-- Create invoices table for payment tracking
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  client_id uuid not null references auth.users(id) on delete cascade,
  amount_cents integer not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'overdue', 'cancelled')),
  stripe_payment_intent_id text,
  stripe_session_id text,
  due_date date,
  paid_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.invoices enable row level security;

-- RLS Policies
create policy "Users can view their own invoices"
  on public.invoices for select
  using (auth.uid() = client_id);

-- Create index for faster queries
create index invoices_client_id_idx on public.invoices(client_id);
create index invoices_project_id_idx on public.invoices(project_id);
