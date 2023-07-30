alter table drafts
alter column user_id drop not null;
alter table drafts add constraint user_id foreign key (id) references profiles (id) on delete cascade;
