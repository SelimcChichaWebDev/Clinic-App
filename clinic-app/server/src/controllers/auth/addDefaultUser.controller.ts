import { UserModel } from 'model/User.model'
import { hashPass } from 'utils/hashPass'

export const addDefaultUser = async (): Promise<void> => {
	try {
		const email = process.env.EMAIL_ADMIN || 'admin@admin.ru'
		const pass = process.env.PASS_ADMIN || 'admin'
		const existingUser = await UserModel.findOne({ email })

		if (!existingUser) {
			const hashPassword = await hashPass(pass, 10)
			const newUser = new UserModel({
				email,
				password: hashPassword,
			})

			await newUser.save()
			console.log('✅ Администратор создан')
		} else {
			console.log('⚠️ Администратор уже существует')
		}
	} catch (error) {
		console.error('❌ Ошибка создания пользователя:', error)
	}
}
