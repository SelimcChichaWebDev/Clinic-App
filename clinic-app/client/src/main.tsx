import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/global.scss'
import { BrowserRouter } from './app/routes'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter />
	</StrictMode>
)
