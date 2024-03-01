import { useEffect, useState } from "react";
import { listen } from '@tauri-apps/api/event'
import ReactMarkdown from 'react-markdown'

interface FileInfo { md: string; file_path: string }

export function Root() {
	const [content, setContent] = useState('')

	useEffect(() => {
		const unlisten = listen<FileInfo>('open', (event) => {
			setContent(event.payload.md)
		})

		return () => {
			unlisten.then(f => f())
		}
	}, []);

	if (content === '') {
		return (
			<div>
				<p>
					Get Started by  <button>Opening a File</button>
				</p>
			</div>
		)
	}

	return (
		<ReactMarkdown className="prose">
			{content}
		</ReactMarkdown>
	)
}
