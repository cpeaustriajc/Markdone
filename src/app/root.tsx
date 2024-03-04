import { useCallback, useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown'
import CodeMirror from '@uiw/react-codemirror'
import { listen } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/tauri'
import { writeTextFile } from '@tauri-apps/api/fs'
import { open } from '@tauri-apps/api/dialog'

interface FileInfo { md: string; file_path: string }

export function App() {
	const [note, setNote] = useState<string | null>(null)

	const handleChange = useCallback((val: string) => {
		setNote(val)
	}, [])

	useEffect(() => {
		const unlisten = listen<FileInfo>('new', (event) => {
			setNote(event.payload.md)
		})
		return () => {
			unlisten.then(f => f())
		}
	}, [])

	useEffect(() => {
		const unlisten = listen<FileInfo>('open', (event) => {
			setNote(event.payload.md)
		})
		return () => {
			unlisten.then(f => f())
		}
	}, []);

	useEffect(() => {
		const unlisten = listen<FileInfo>('save', async (event) => {
			if (!note) {
				throw new Error("Note content does not exist")
			}
			await writeTextFile({ path: event.payload.file_path, contents: note })
			console.log(event.payload.file_path)
		})

		return () => {
			unlisten.then(f => f())
		}
	})

	useEffect(() => {
		const unlisten = listen<FileInfo>('close', () => {
			setNote(null)
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
		setNote(md)
	}

	if (note === null) {
		return (
			<div>
				<p>
					Get Started by  <button onClick={openFile}>Opening a File</button>
				</p>
			</div>
		)
	}

	return (
		<div className="flex flex-row">
			<CodeMirror className="basis-1/2" value={note} onChange={handleChange} />
			<div className="basis-1/2">
				<ReactMarkdown className="prose basis-1/2">
					{note}
				</ReactMarkdown>
			</div>
		</div>
	)
}
