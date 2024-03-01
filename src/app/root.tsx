import { useEffect, useState } from "react";
import { listen } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/tauri'
import { open } from '@tauri-apps/api/dialog'
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

	useEffect(() => {
		const unlisten = listen<FileInfo>('close', () => {
			setContent("")

			return () => {
				unlisten.then(f => f())
			}
		})
	}, [])

	const openFile = async () => {
		const selected = await open({
			filters: [{
				name: "Markdown",
				extensions: ['md']
			}]
		})

		if (!selected) {
			throw new Error("File does not exist");
		}

		const md = await invoke<string>("read_md_file", { filePath: selected })
		setContent(md)
	}

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
