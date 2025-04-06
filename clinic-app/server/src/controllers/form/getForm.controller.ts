import { Request, Response } from 'express'
import { FormModel } from 'model/Form.model'
import { formatDate } from 'utils/formDate'

export const getForm = async (req: Request, res: Response): Promise<void> => {
	try {
		const page = Number(req.query.page) || 1
		const limit = Number(req.query.limit) || 10
		const skip = (page - 1) * limit

		const totalForms = await FormModel.countDocuments()

		const formData = await FormModel.find().skip(skip).limit(limit)

		const formatFormData = formData.map(form => ({
			...form.toObject(),
			created_at: formatDate(form.created_at as Date),
		}))

		if (formatFormData.length === 0) {
			res.status(402).json({ message: 'Данных нет' })
		}

		res.status(201).json({
			data: formatFormData,
			totalForms,
			totalPages: Math.ceil(totalForms / limit),
			currentPage: page,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json('Something went wrong')
	}
}
