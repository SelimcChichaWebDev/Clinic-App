import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from 'model/User.model'

export const getProfile = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response<string> | void> => {
	try {
		const token = req.cookies?.token
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' })
		}

		const secretKey = process.env.JWT_SECRET || 'secret'
		const decoded = jwt.verify(token, secretKey) as { email: string }

		const user = await UserModel.findOne({ email: decoded.email })
		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		return res.status(200).json({ email: user.email })
	} catch (error) {
		console.error(error)
		console.error(error)

		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(403).json({ message: 'Invalid token' })
		}

		next(error)
	}
}
