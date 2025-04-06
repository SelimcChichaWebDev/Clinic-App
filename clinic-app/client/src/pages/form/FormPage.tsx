import { yupResolver } from '@hookform/resolvers/yup'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { submitFormData } from '../../api/form/postApi.form'
import { AnimeComponent } from '../../components/AnimeComponent'
import { Title } from '../../components/Title'
import { formSchema } from '../../utils/formSchema'

//! Todo: Working with Api FormPage & add lib notify
export interface IFormData {
	fullName: string
	phone: string
	problem: string
}

const FormPage: FC = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({
		resolver: yupResolver(formSchema),
	})
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	const showSuccessToast = () => toast.success('Форма успешно отправлена!')
	const showErrorToast = () =>
		toast.error('Ошибка при отправке', { theme: 'dark' })

	const onSubmit = handleSubmit(async data => {
		setIsSubmitting(true)
		try {
			await submitFormData(data)
			showSuccessToast()
			reset()
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message)
				showErrorToast()
			} else {
				console.log('Что-то пошло не так')
			}
		} finally {
			setIsSubmitting(false)
		}
	})

	return (
		<>
			<AnimeComponent>
				<div className='wrapper-form'>
					<Title title='Запись к врачу' />
					<form onSubmit={onSubmit}>
						<div className='form-failed'>
							<label htmlFor='fullName'>ФИО</label>
							<input
								type='text'
								{...register('fullName')}
								className={errors.fullName ? 'form-input__error' : 'form-input'}
							/>
							<span>{errors.fullName && errors.fullName?.message}</span>
						</div>
						<div className='form-failed'>
							<label htmlFor='phone'>Номер телефона</label>
							<input
								type='tel'
								{...register('phone')}
								className={errors.phone ? 'form-input__error' : 'form-input'}
							/>
							<span>{errors.phone && errors.phone?.message}</span>
						</div>
						<div className='form-failed'>
							<label htmlFor='problem'>Опишите вашу проблему</label>
							<textarea
								{...register('problem')}
								style={{ resize: 'none' }}
								className={errors.problem ? 'form-input__error' : 'form-input'}
							/>
							<span>{errors.problem && errors.problem?.message}</span>
						</div>
						<div className='form-failed'>
							<button
								disabled={isSubmitting}
								className='form-button'
								type='submit'
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

export default FormPage
