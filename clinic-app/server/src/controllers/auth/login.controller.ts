import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from 'model/User.model'

export const loginUser = async (req: Request, res: Response): Promise<void> => {
	try {
		// Чтение данных из окружения
		const secretKey = process.env.JWT_SECRET as string | undefined
		// Email & Pass берем из client
		const { email, password } = req.body as { email: string; password: string }

		const user = await UserModel.findOne({ email })
		if (!user) {
			res.status(400).json({ message: 'User not found!' })
			return
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password)
		if (!isPasswordCorrect) {
			res.status(400).json({ message: 'Wrong password!' })
			return
		}

		if (!secretKey) return

		const token = jwt.sign({ email: user.email, id: user._id }, secretKey, {
			expiresIn: '7d',
		})

		res.cookie('token', token, {
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})

		res.status(200).json({ message: 'Login successful', token })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'SignIn not working (' })
	}
}
