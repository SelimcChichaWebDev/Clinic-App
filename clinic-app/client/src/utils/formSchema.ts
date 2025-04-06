import * as yup from 'yup'

export const formSchema = yup.object().shape({
	fullName: yup.string().min(3, 'Минимум 3 символа').required('Введите ФИО'),
	phone: yup
		.string()
		.matches(/^\+?[0-9]{10,15}$/, 'Введите корректный номер')
		.required('Введите номер телефона'),
	problem: yup
		.string()
		.min(10, 'Минимум 10 символов')
		.required('Опишите проблему'),
})

export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email('Введите корректный email')
		.required('Введите email'),
	password: yup
		.string()
		.min(3, 'Минимум 3 символов')
		.required('Введите пароль'),
})
