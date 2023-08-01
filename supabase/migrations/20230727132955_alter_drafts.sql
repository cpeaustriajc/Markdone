alter table drafts
  drop column id;

alter table drafts
	add column id uuid default gen_random_uuid() not null primary key;
