'use server'

import { sql } from '@/lib/db'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export async function createDraft() {
	const supabase = createServerActionClient({ cookies })
	const { data } = await supabase.auth.getUser()

	if (!data?.user) {
		throw new Error('You must be logged in to create a draft with cloud storage.')
	}

	await sql`
		insert into drafts (filename, content, owner)
		values ('Untitled', '', ${data?.user.id})
	`
	revalidatePath('/')
}

export async function deleteDraft(id: string) {
	await sql`
		delete from drafts
		where id = ${id}
	`

	revalidatePath('/')
}

export async function updateFilename(id: string, filename: string) {
	await sql`
		update drafts
		set filename = ${filename}
		where id = ${id}
	`

	revalidatePath(`/editor/${id}`)
}

export async function updateContent(id: string, content: string) {
	await sql`
		update drafts
		set content = ${content}
		where id = ${id}
	`
	revalidatePath(`/editor/${id}`)
}
