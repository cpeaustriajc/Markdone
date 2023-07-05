import { Editor } from '@/components/editor'
import { Header } from '@/components/header'
import { Preview } from '@/components/preview'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex h-full flex-col md:flex-row">
        <Editor />
        <Preview />
      </main>
    </>
  )
}
