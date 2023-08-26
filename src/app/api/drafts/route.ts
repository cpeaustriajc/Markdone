import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
	const draft = await prisma.drafts.findMany()
	return NextResponse.json(draft)
}
