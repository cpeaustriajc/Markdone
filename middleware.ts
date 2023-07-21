import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const theme = request.cookies.get('theme')?.value ?? 'dark'
	const response = NextResponse.next()

	response.cookies.set('theme', theme, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		expires: new Date(60 * 60 * 24 * 365 * 10 * 1000 + Date.now()),
		priority: 'high'
	})

	return response
}
