import { Editor } from '@/components/editor'
import { Header } from '@/components/header'
import { Preview } from '@/components/preview'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex h-[calc(100%-4rem)] flex-col md:flex-row">
        <Editor />
        <Preview />
      </main>
    </>
  )
}
