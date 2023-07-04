import { Editor } from '@/components/editor'
import { Header } from '@/components/header'
import { Preview } from '@/components/preview'
import { Separator } from '@/components/ui/separator'

export default function HomePage() {
  return (
    <>
      <main className="flex h-full flex-col md:flex-row">
        <Editor />
        <Separator orientation="vertical" />
        <Preview />
      </main>
    </>
  )
}
