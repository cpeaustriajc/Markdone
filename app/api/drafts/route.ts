import { Database } from '@/lib/database.types'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
	const supabase = createRouteHandlerClient<Database>({ cookies })
	const { data } = await supabase.from('drafts').select('*')

	return NextResponse.json(data)
}
