import { Request, Response } from 'express'
import { FormModel, IForm } from 'model/Form.model'

export const addForm = async (req: Request, res: Response): Promise<void> => {
	try {
		const { fullName, phone, problem } = req.body as IForm

		const formModel = await FormModel.create({
			fullName,
			phone,
			problem,
		})

		await formModel.save()
		res.status(201).json({ message: '✅ Форма создан' })
		console.log('✅ Форма создан')
	} catch (error) {
		console.error(error)
		res.status(500).json('Something was worng')
	}
}
