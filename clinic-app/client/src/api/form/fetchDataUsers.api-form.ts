import { Dispatch, SetStateAction } from 'react'
import { IUsersFormDataTransformer } from '../../utils/transformUsers'
import { getFormData } from './getApi.form'

export const fetchData = async (
	page: number,
	setTotalPages: Dispatch<SetStateAction<number>>,
	setUsersData: Dispatch<SetStateAction<IUsersFormDataTransformer[]>>,
	setError: Dispatch<SetStateAction<string | null>>,
	setLoading: Dispatch<SetStateAction<boolean>>
): Promise<void> => {
	try {
		const data = await getFormData(page, setTotalPages)
		setUsersData(data)
	} catch (error) {
		console.error(error instanceof Error && error.message)
		setError('Ошибка загрузки данных')
	} finally {
		setLoading(false)
	}
}
