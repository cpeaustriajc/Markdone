import { useEffect, useState } from "react";
import { listen } from '@tauri-apps/api/event'

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
		<>
			<p>
				Hello World!
			</p>
			<button className="px-5 py-2 text-sm text-center transition rounded-lg border border-black/10 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] dark:shadow-none cursor-default bg-blue-600 hover:bg-blue-700 pressed:bg-blue-800 text-white">Open File</button>
			{content}
		</>
	)
}
