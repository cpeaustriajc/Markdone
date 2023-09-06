create table "public"."drafts" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "owner" uuid,
    "filename" text,
    "content" text
);


alter table "public"."drafts" enable row level security;

CREATE UNIQUE INDEX drafts_pkey ON public.drafts USING btree (id);

alter table "public"."drafts" add constraint "drafts_pkey" PRIMARY KEY using index "drafts_pkey";

alter table "public"."drafts" add constraint "drafts_owner_fkey" FOREIGN KEY (owner) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."drafts" validate constraint "drafts_owner_fkey";


