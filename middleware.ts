import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
	publicRoutes: ['/', '/drafts(.*)', '/sign-in(.*)', '/sign-up(.*)'],
	afterAuth: async (auth, req) => {
		if (auth.isPublicRoute) {
			return NextResponse.next()
		}

		const url = new URL(req.nextUrl.origin)

		if (!auth.userId) {
			url.pathname = '/sign-in'
			return NextResponse.redirect(url)
		}
	},
})

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/(api)(.*)'],
}
