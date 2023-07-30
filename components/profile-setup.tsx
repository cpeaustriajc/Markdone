'use client'

import ProfileImage from '@/components/profile-image'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Session } from '@supabase/supabase-js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export function ProfileSetup({ session }: { session: Session | null }) {
	const [isLoading, setIsLoading] = useState(true)
	const [fullname, setFullname] = useState<string | null>(null)
	const [username, setUsername] = useState<string | null>(null)
	const [avatar_url, setAvatarUrl] = useState<string | null>(null)
	const user = session?.user
	const supabase = useSupabaseClient()

	const getProfile = useCallback(async () => {
		try {
			setIsLoading(true)

			const { data, error, status } = await supabase
				.from('profiles')
				.select('full_name, username, avatar_url')
				.eq('id', user?.id)
				.single()

			if (error && status != 406) {
				throw error
			}

			if (data) {
				setFullname(data.full_name)
				setUsername(data.username)
				setAvatarUrl(data.avatar_url)
			}
		} catch {
			throw new Error('Error loading profile')
		} finally {
			setIsLoading(false)
		}
	}, [user, supabase])

	useEffect(() => {
		getProfile()
	}, [user, getProfile])

	const updateProfile = async ({
		username,
		avatar_url,
	}: {
		username: string | null
		fullname: string | null
		avatar_url: string | null
	}) => {
		try {
			setIsLoading(true)

			const { error } = await supabase.from('profiles').upsert({
				id: user?.id as string,
				full_name: fullname,
				username,
				avatar_url,
				updated_at: new Date().toISOString(),
			})

			if (error) throw error
		} catch {
			throw new Error('Error updating profile')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form className="space-y-2">
			<ProfileImage
				size={150}
				uid={user!.id}
				url={avatar_url}
				onUpload={url => {
					setAvatarUrl(url)
					updateProfile({ fullname, username, avatar_url: url })
				}}
			/>

			<div className="space-y-1">
				<Label htmlFor="email">Email</Label>
				<Input id="email" type="text" value={session?.user.email} disabled />
			</div>
			<div className="space-y-1">
				<Label htmlFor="full-name">Full Name</Label>
				<Input id="full-name" type="text" value={fullname || ''} onChange={e => setFullname(e.target.value)} />
			</div>
			<div className="space-y-1">
				<Label htmlFor="username">Username</Label>
				<Input id="username" type="text" value={username || ''} onChange={e => setUsername(e.target.value)} />
			</div>
			<div className="space-y-1">
				<Button
					type="submit"
					onClick={() => updateProfile({ fullname, username, avatar_url })}
					disabled={isLoading}>
					{isLoading ? 'Loading...' : 'Update'}
				</Button>
			</div>
		</form>
	)
}
