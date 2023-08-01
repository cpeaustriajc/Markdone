import { Html, Head, Main, NextScript } from 'next/document'

export default function AppDocument() {
	return (
		<Html lang="en" className="h-full">
			<Head>
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<link rel="icon" type="image/png" sizes="16x16" href="/icon-16.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<meta name="theme-color" media="(prefers-color-scheme: dark)" color="black" />
				<meta name="theme-color" media="(prefers-color-scheme: light)" color="white" />
			</Head>
			<body className="h-full bg-background text-foreground">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
