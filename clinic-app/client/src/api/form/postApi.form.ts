import { API_POST_FORM } from '../../constants/api'
import { IFormData } from '../../pages/form/FormPage'

export const submitFormData = async (data: IFormData): Promise<void> => {
	const response = await fetch(API_POST_FORM, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})

	if (!response.ok) {
		throw new Error('Ошибка отправки формы')
	}
}
