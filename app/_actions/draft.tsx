// Experimental Server Actions code, will be used once the feature is stable in Next.js

'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath, revalidateTag } from 'next/cache'
import { Database } from '@/lib/database.types'

export async function experimental_createDraft() {
	const supabase = createServerActionClient<Database>({ cookies })
	const { data } = await supabase.auth.getUser()

	if (!data?.user) {
		throw new Error('You must be logged in to create a draft with cloud storage.')
	}

	await supabase.from('drafts').insert({ filename: "Untitled", content: "", id: data?.user.id })

	revalidateTag('drafts')
}

export async function experimental_deleteDraft(id: string) {
	const supabase = createServerActionClient<Database>({ cookies })
	await supabase.from('drafts').delete().eq("id", id)

	revalidateTag('drafts')
}

export async function experimental_updateFilename(id: string, filename: string) {
	const supabase = createServerActionClient<Database>({ cookies })

	await supabase.from('drafts').update({ filename }).eq('id', id)

	revalidateTag('filename')
}

export async function experimental_updateContent(id: string, content: string) {
	await sql`
		update drafts
		set content = ${content}
		where id = ${id}
	`
	revalidateTag('content')
}
