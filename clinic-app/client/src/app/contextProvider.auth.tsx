import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { getProfile } from '../api/auth/getApi.auth'
import { ILoginData } from '../pages/auth/AuthPage'
import { AuthContext } from './context.auth'

export interface IAuthContext {
	isAuth: ILoginData | null
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isAuth, setIsAuth] = useState<ILoginData | null>(null)

	useEffect(() => {
		const isLogin = async () => {
			const userData = await getProfile()
			if (userData) {
				setIsAuth(userData)
			}
		}

		isLogin()
	}, [])

	return (
		<AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
	)
}
