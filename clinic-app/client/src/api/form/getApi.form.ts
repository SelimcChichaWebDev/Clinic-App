import { Dispatch, SetStateAction } from 'react'
import { API_GET_USERS } from '../../constants/api'
import {
	IUsersFormDataTransformer,
	transformerUsersData,
} from '../../utils/transformUsers'

export interface IUsersFormDataApi {
	fullName: string
	phone: string
	problem: string
	created_at: string
}

export interface IUsersFormResponse {
	data: IUsersFormDataApi[]
	totalPages: number
}

export const getFormData = async (
	page: number,
	setTotalPages: Dispatch<SetStateAction<number>>
): Promise<IUsersFormDataTransformer[]> => {
	try {
		const response = await fetch(`${API_GET_USERS}?page=${page}&limit=10`)

		if (!response.ok) {
			throw new Error('Data not loaded')
		}
		const result: IUsersFormResponse = await response.json()

		setTotalPages(result.totalPages)

		return result.data.map(transformerUsersData)
	} catch (error) {
		console.error(
			error instanceof Error ? error.message : 'Something went wrong'
		)

		return []
	}
}
