import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get('id')

	if (!id) {
		return NextResponse.json({ status: 400, error: 'No id provided' })
	}

	if (id === '0') {
		return NextResponse.json({ content: '', filename: 'Empty', id: 0 })
	}

	const draft = await prisma.drafts.findUnique({ where: { id } })

	return NextResponse.json(draft)
}
