import { toast } from 'react-toastify'
import { API_AUTH_LOGIN } from '../../constants/api'
import { ILoginData } from '../../pages/auth/AuthPage'

export const fetchAuthLogin = async ({
	email,
	password,
}: ILoginData): Promise<void> => {
	const request = await fetch(API_AUTH_LOGIN, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
		credentials: 'include',
	})

	if (!request.ok) {
		toast.warn('Вы уже отправляли такий данный :(')
		throw new Error('Ошибка авторизации')
	}
}
