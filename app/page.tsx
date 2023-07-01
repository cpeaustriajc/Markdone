'use client'

import { Editor } from '@/components/editor'
import { Preview } from '@/components/preview'
import { Spinner } from '@/components/ui/spinner'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.text())

export default function HomePage() {
  const { data, error, isLoading } = useSWR(
    'https://gist.githubusercontent.com/jaycedotbin/c9a7ac32fa5bc58eaeb50e0b8fa65555/raw/b438ba5c6ff0cefcba1030a69ff5e2ce098473ac/markdown-tutorial.md',
    fetcher
  )

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-full">
        <Spinner />
      </main>
    )
  }

  if (error) {
    return new Error(error)
  }

  return (
    <>
      <main className="flex flex-row h-full">
        {data && (
          <>
            <Editor doc={data} />
            <Preview doc={data} />
          </>
        )}
      </main>
    </>
  )
}
