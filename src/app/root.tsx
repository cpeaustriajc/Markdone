import { useEffect, useState } from "react";
import { listen } from '@tauri-apps/api/event'
import ReactMarkdown from 'react-markdown'

export function Root() {
	const [content, setContent] = useState('')

	useEffect(() => {
		const unlisten = listen<{ md: string, file_path: string }>('open', (event) => {
			setContent(event.payload.md)
		})

		return () => {
			unlisten.then(f => f())
		}
	}, []);

	return (
		<ReactMarkdown className="prose">
			{content}
		</ReactMarkdown>
	)
}
