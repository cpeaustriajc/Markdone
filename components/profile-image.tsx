'use client'

import { Database } from '@/types/database.types'
import { Avatar } from '@radix-ui/react-avatar'
import React, { useEffect, useState } from 'react'
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
type Profiles = Database['public']['Tables']['profiles']['Row']

interface ProfileImageProps {
	uid: string
	url: Profiles['avatar_url']
	size: number
	onUpload: (url: string) => void
}

export default function ProfileImage({ uid, url, size, onUpload }: ProfileImageProps) {
	const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(url)
	const [isUploading, setIsUploading] = useState(false)
	const supabase = useSupabaseClient()

	useEffect(() => {
		async function downloadImage(path: string) {
			const { data, error } = await supabase.storage.from('avatars').download(path)

			if (error) {
				throw error
			}

			const url = URL.createObjectURL(data)
			setAvatarUrl(url)
		}

		if (url) downloadImage(url)
	}, [url, supabase])

	const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async event => {
		try {
			setIsUploading(true)

			if (!event.target.files || event.target.files.length === 0) {
				throw new Error('You must select an image to upload.')
			}

			const file = event.target.files[0]
			const fileExt = file.name.split('.').pop()
			const filePath = `${uid}-${Math.random()}.${fileExt}`

			const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

			if (uploadError) {
				throw new Error('Failed to upload avatar: ' + uploadError)
			}

			onUpload(filePath)
		} catch (error) {
			throw new Error('Error uploading avatar: ' + error)
		} finally {
			setIsUploading(false)
		}
	}

	return (
		<>
			{avatarUrl ? (
				<Avatar>
					<AvatarImage src={avatarUrl} alt="Avatar" width={size} height={size} />
					<AvatarFallback />
				</Avatar>
			) : (
				<div className="space-y-1">
					<Label htmlFor="upload-single-file">{isUploading ? 'Uploading...' : 'Upload Avatar'}</Label>
					<Input
						type="file"
						id="upload-single-file"
						accept="image/png,image/webp,image/avif,image/jpeg,image/tiff"
						onChange={uploadAvatar}
						disabled={isUploading}
					/>
				</div>
			)}
		</>
	)
}
