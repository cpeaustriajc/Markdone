'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { ReloadIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <main className="flex h-full flex-col items-center justify-center gap-4">
      <section>
        <strong className="text-lg font-semibold">Something went wrong!</strong>
      </section>
      <section>
        <Button onClick={() => reset()}>
          <ReloadIcon className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </section>
    </main>
  )
}
