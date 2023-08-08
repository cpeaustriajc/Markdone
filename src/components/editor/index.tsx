'use client'

import { inter } from '@/lib/fonts'
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { EditorThemeClasses } from 'lexical'

const theme: EditorThemeClasses = {}

function onError(error: Error) {
	console.error(error)
}

export function EditorV2() {
	const initialConfig: InitialConfigType = {
		namespace: 'Editor',
		theme,
		onError,
	}

	const Placeholder: React.FC = () => {
		return (
			<div className={`absolute left-10 top-2 text-gray-50 opacity-30 ${inter.className}`}>
				Enter some text...
			</div>
		)
	}

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<HistoryPlugin />
			<PlainTextPlugin
				contentEditable={
					<ContentEditable
						className={`h-full w-full self-center justify-self-center rounded border border-border p-2 ${inter.className}`}
						title="Editor"
					/>
				}
				placeholder={<Placeholder />}
				ErrorBoundary={LexicalErrorBoundary}
			/>
		</LexicalComposer>
	)
}
