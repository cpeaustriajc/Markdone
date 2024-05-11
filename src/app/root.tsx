import { useCallback, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import CodeMirror from '@uiw/react-codemirror'
import { Event, EventName, listen } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/core'
import { BaseDirectory, writeTextFile } from '@tauri-apps/plugin-fs'
import { open } from '@tauri-apps/plugin-dialog'
import { components } from '@/lib/theme/default/components'
import { getSerwist } from 'virtual:serwist'

interface FileInfo {
  md: string
  file_path: string
}

/**
 * A hook for listening to Tauri events where the event payload is of type `<T>`.
 * @param event The event name to listen to
 * @param cb The callback function to be called when the event is triggered
 */
function useIPCTauri<T>(event: EventName, cb: (event: Event<T>) => void) {
  useEffect(() => {
    if (window.__TAURI__) {
      const unlisten = listen<T>(event, cb)

      return () => {
        unlisten.then(f => f())
      }
    }
  })
}

export function App() {
  const [note, setNote] = useState<string | null>(null)

  const handleChange = useCallback((val: string) => {
    setNote(val)
  }, [])

  useIPCTauri<FileInfo>('new', event => {
    setNote(event.payload.md)
  })

  useIPCTauri<FileInfo>('open', event => {
    setNote(event.payload.md)
  })

  useIPCTauri<FileInfo>('save', async event => {
    if (!note) {
      throw new Error('Note content does not exist')
    }
    await writeTextFile(event.payload.file_path, note, {
      baseDir: BaseDirectory.Home,
    })
  })

  useIPCTauri<FileInfo>('close', () => {
    setNote(null)
  })

  const openFile = async () => {
    let md: string | undefined = ''
    let selected
    if (window.__TAURI__) {
      selected = await open({
        filters: [
          {
            name: 'Markdown',
            extensions: ['md'],
          },
        ],
      })

      if (!selected) {
        throw new Error('File does not exist')
      }
      md = await invoke<string>('read_md_file', { filePath: selected })
    } else {
      ;[selected] = await window.showOpenFilePicker()
      const file = await selected.getFile()
      md = await file.text()
    }

    setNote(md)
  }

  useEffect(() => {
    const loadSerwist = async () => {
      if ('serviceWorker' in navigator) {
        const serwist = await getSerwist()

        serwist?.addEventListener('installed', () => {
          console.log('Serwist installed!')
        })

        void serwist?.register()
      }
    }

    loadSerwist()
  }, [])

  if (note === null) {
    return (
      <div className="grid h-dvh place-items-center">
        <p>
          Get Started by <button onClick={openFile}>Opening a File</button>
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-row">
      <CodeMirror className="basis-1/2" value={note} onChange={handleChange} />
      <div className="basis-1/2 px-2">
        <ReactMarkdown
          className="prose basis-1/2"
          components={components.markdown}>
          {note}
        </ReactMarkdown>
      </div>
    </div>
  )
}
