import { IUsersFormDataApi } from '../api/form/getApi.form'

export interface IUsersFormDataTransformer
	extends Omit<IUsersFormDataApi, 'created_at'> {
	createdAt: string
}

export const transformerUsersData = ({
	fullName,
	phone,
	problem,
	created_at,
}: IUsersFormDataApi): IUsersFormDataTransformer => ({
	fullName,
	phone,
	problem,
	createdAt: created_at,
})
