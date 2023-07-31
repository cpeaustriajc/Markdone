import { inter, roboto_mono } from '@/lib/fonts'
import { Providers } from '@/lib/providers'
import { AppProps } from 'next/app'

export default function AppRoot({ Component, pageProps }: AppProps) {
	return (
		<Providers>
			<div className={`isolate contents ${inter.variable} ${roboto_mono.variable}`}>
				<Component {...pageProps} />
			</div>
		</Providers>
	)
}
