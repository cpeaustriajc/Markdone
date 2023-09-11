import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";

export async function GET(request: Request) {
	const { id } = await request.json() as { id: string }
	const supabase = createRouteHandlerClient<Database>({ cookies })
	const { data, error } = await supabase.from('drafts').select('id, content').eq('id', id).single()
	return NextResponse.json(data)
}

export async function POST(request: Request) {
	const { } = await request.json()
	const supabase = createRouteHandlerClient<Database>({ cookies })
	const { data, error } = await supabase.from('drafts').insert({}).single()

	return NextResponse.json(data)
}

export async function PUT(request: Request) {
	const { } = await request.json()
	const supabase = createRouteHandlerClient<Database>({ cookies })
	const { data, error } = await supabase.from('drafts').update({}).single()

	return NextResponse.json(data)
}

export async function DELETE(request: Request) {
	const { } = await request.json()
	const supabase = createRouteHandlerClient<Database>({ cookies })
	const { data, error } = await supabase.from('drafts').delete().single()

	return NextResponse.json(data)
}

