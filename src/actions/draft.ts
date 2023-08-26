'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'


// TODO: Runtime checking
export async function createDraft() {
	await prisma.drafts.create({ data: {} })
	revalidatePath('/')
}

// TODO: Runtime checking
export async function deleteDraft(id: string) {
	await prisma.drafts.deleteMany({ where: { id } })
	revalidatePath('/')
}
