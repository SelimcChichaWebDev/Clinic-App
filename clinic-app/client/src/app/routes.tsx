import { FC, lazy, Suspense } from 'react'
import {
	createBrowserRouter,
	RouterProvider,
	useRouteError,
} from 'react-router-dom'
import { LazyLoader } from '../components/Loader'
import { NotFoundPage } from '../pages/404/NotFoundPage'
import { AuthProvider } from './contextProvider.auth'

const HomePage = lazy(() => import('../pages/home/HomePage'))
const AuthPage = lazy(() => import('../pages/auth/AuthPage'))
const FormPage = lazy(() => import('../pages/form/FormPage'))
const UsersPage = lazy(() => import('../pages/order/UsersPage'))

const BubbleError: FC = () => {
	const error = useRouteError()
	if (error) throw error
	return null
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		errorElement: <BubbleError />,
		children: [
			{
				path: 'login',
				element: <AuthPage />,
				errorElement: <BubbleError />,
			},
			{
				path: 'form',
				element: <FormPage />,
				errorElement: <BubbleError />,
			},
			{
				path: 'users',
				element: <UsersPage />,
				errorElement: <BubbleError />,
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
])

export const BrowserRouter: FC = () => {
	return (
		<AuthProvider>
			<Suspense fallback={<LazyLoader />}>
				<RouterProvider router={router} />
			</Suspense>
		</AuthProvider>
	)
}
