import '@/styles/globals.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Root } from '@/routes/root'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Providers } from '@/lib/providers'
import { ErrorPage } from '@/error'

const rootElement = document.querySelector('#root') as HTMLDivElement

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement:<ErrorPage/>
	},
])

const root = createRoot(rootElement)
root.render(
	<StrictMode>
		<Providers>
			<RouterProvider router={router} />
		</Providers>
	</StrictMode>,
)
