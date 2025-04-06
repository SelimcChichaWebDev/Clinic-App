import chalk from 'chalk'
import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL as string

export const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(MONGO_URL)
		console.log(chalk.green('✅ База данных подключена'))
	} catch (error) {
		console.error(chalk.red('❌ Ошибка подключения к MongoDB:', error))
		process.exit(1)
	}
}
