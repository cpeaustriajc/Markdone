'use server'

import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

export async function createDraft() {
	'use server'
	const user = await currentUser()

	if (!user || !user.primaryEmailAddressId) {
		throw new Error('You must be logged in to create a draft with cloud storage.')
	}

	await prisma.drafts.create({
		data: { owner: user?.id },
	})
	revalidatePath('/')
}

export async function deleteDraft(formData: FormData) {
	'use server'

	await prisma.drafts.delete({ where: { id: formData.get('id') as string } })

	revalidatePath('/')
}

export async function updateFilename(id: string, filename: string) {
	await prisma.drafts.update({
		data: { filename },
		where: { id },
		select: { filename: true },
	})

	revalidatePath(`/editor/${id}`)
}

export async function updateContent(id: string, content: string) {
	await prisma.drafts.update({
		data: { content },
		where: { id },
		select: { content: true },
	})

	revalidatePath(`/editor/${id}`)
}
