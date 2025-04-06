import { yupResolver } from '@hookform/resolvers/yup'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { getProfile } from '../../api/auth/getApi.auth'
import { fetchAuthLogin } from '../../api/auth/postApi.auth'
import { AnimeComponent } from '../../components/AnimeComponent'
import { loginSchema } from '../../utils/formSchema'

export interface ILoginData {
	email: string
	password: string
}

const AuthPage: FC = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginData>({
		resolver: yupResolver(loginSchema),
	})
	const navigate = useNavigate()

	const showSuccessToast = () => toast.success('Пользователь успешно вошел!')
	const showErrorToast = () =>
		toast.error('Ошибка при логине', { theme: 'dark' })

	const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false)

	const onSubmit = handleSubmit(async data => {
		try {
			setIsAuthorizing(true)
			await fetchAuthLogin(data)
			const userData = await getProfile()
			if (userData) {
				showSuccessToast()
				navigate('/')
			}
		} catch (error) {
			console.error(error instanceof Error && error.message)
			showErrorToast()
		} finally {
			setIsAuthorizing(false)
			reset()
		}
	})

	return (
		<>
			<AnimeComponent>
				<div className='auth-container'>
					<h1>Login</h1>
					<form onSubmit={onSubmit}>
						<div className='form-failed'>
							<label htmlFor='email'>Электорная почта</label>
							<input
								type='email'
								{...register('email')}
								className={errors.email ? 'form-input__error' : 'form-input'}
							/>
							<span>{errors.email && errors.email?.message}</span>
						</div>
						<div className='form-failed'>
							<label htmlFor='password'>Пароль</label>
							<input
								type='password'
								{...register('password')}
								className={errors.password ? 'form-input__error' : 'form-input'}
							/>
							<span>{errors.password && errors.password?.message}</span>
						</div>
						<div className='form-failed'>
							<button
								disabled={isAuthorizing}
								type='submit'
								className='auth-button'
							>
								Отправить
							</button>
						</div>
					</form>
				</div>
			</AnimeComponent>
			<ToastContainer />
		</>
	)
}

export default AuthPage
