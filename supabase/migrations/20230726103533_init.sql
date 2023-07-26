-- Create a table for public profiles
create table profiles (
	id uuid references auth.users not null primary key,
	updated_at timestamp with time zone,
	username text unique,
	full_name text,
	avatar_url text,

	constraint username_length check(char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles
	enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
	for select using (true);

create policy "Users can insert their own profiles." on profiles
	for insert with check (auth.uid() = id);

create policy "Users can update own profiles." on profiles
	for update using (auth.uid() = id);

create function public.handle_new_user()
	returns trigger as $$
	begin
		insert into public.profiles (id, full_name, avatar_url)
		values(new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
		return new;
	end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
	after insert on auth.Users
	for each row execute procedure public.handle_new_user();

-- Set up Storage
insert into storage.buckets (id, name)
	values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible." on storage.objects
	for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
	for insert with check (bucket_id = 'avatars');

create policy "Anyone can delete an avatar." on storage.objects
	for delete using (bucket_id = 'avatars');
