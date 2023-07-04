import { Editor } from '@/components/editor'
import { Header } from '@/components/header'
import { Preview } from '@/components/preview'
import { Separator } from '@/components/ui/separator'

export default async function HomePage() {
  const initialDocument =
    'Get started with Markdone by learning [markdown](https://www.markdownguide.org/)'

  return (
    <>
      <Header />
      <main className="flex h-full flex-col md:flex-row">
        <Editor doc={initialDocument} />
        <Separator orientation="vertical" />
        <Preview doc={initialDocument} />
      </main>
    </>
  )
}
