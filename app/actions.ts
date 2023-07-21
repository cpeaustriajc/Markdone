import { cookies } from 'next/headers'

export function getTheme() {
	return cookies().get('theme')?.value ?? 'dark'
}

export async function setTheme(theme: string) {
	'use server'
	cookies().set('theme', theme, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		expires: new Date(60 * 60 * 24 * 365 * 10 * 1000 + Date.now()),
		priority: 'high',
	})
}
