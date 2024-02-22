import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import './styles/globals.css'
import { Root } from './app/root'
import { EditorProvider } from './components/editor/legacy'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <EditorProvider>
            <RouterProvider router={router} />
        </EditorProvider>
    </React.StrictMode>
)
