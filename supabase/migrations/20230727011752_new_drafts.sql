create table drafts (
	id uuid default gen_random_uuid() not null primary key,
	user_id uuid references auth.users not null,
	created_at timestamp with time zone default timezone('utc'::text, now()) not null,
	content text default ''::text not null,
	filename text default ''::text not null
);

alter table drafts enable row level security;

create policy "Individuals can create new drafts." on drafts for
	insert with check (auth.uid() = user_id);

create policy "Individuals can view their own drafts." on drafts for
	select using (auth.uid() = user_id);

create policy "Individuals can update their own drafts." on drafts for
	update using (auth.uid() = user_id);

create policy "Individuals can delete their own drafts." on drafts for
	delete using (auth.uid() = user_id);

