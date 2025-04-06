import { API_AUTH_PROFILE } from '../../constants/api'
import { ILoginData } from '../../pages/auth/AuthPage'

export const getProfile = async (): Promise<ILoginData> => {
	const response = await fetch(API_AUTH_PROFILE, {
		method: 'GET',
		credentials: 'include',
	})

	if (!response.ok) throw new Error('Пользователь не авторизован')
	return response.json()
}
