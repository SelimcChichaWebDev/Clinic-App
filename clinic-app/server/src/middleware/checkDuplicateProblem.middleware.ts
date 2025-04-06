import { NextFunction, Request, Response } from 'express'
import { FormModel, IForm } from 'model/Form.model'

export const checkDuplicateProblem = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { fullName, phone, problem } = req.body as IForm
		const formDataProblem = await FormModel.findOne({
			fullName,
			phone,
			problem,
		})

		if (formDataProblem) {
			res.status(400).send({ message: 'Data Forms: Problem already exists' })
			return
		}

		next()
	} catch (error) {
		console.error(error)
		res.status(500).send({ message: 'Server error' })
	}
}
