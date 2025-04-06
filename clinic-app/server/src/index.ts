import chalk from 'chalk'
import { addDefaultUser } from 'controllers/auth/addDefaultUser.controller'
import dotenv from 'dotenv'
import express from 'express'
import routerAuth from 'routes/auth.routes'
import { routeFormGet, routeFormPost } from 'routes/form.routes'
import { connectDB } from './config/db'
import { defaultAppMiddleware } from './middleware/app.middleware'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3200

// Middlewares
defaultAppMiddleware(app)

const startServer = async () => {
	try {
		// Connect DB
		await connectDB()
		// Add admin user to DB
		await addDefaultUser()

		// Routes
		app.use('/api/auth', routerAuth)
		app.use('/api/form/create', routeFormPost)
		app.use('/api/form/view', routeFormGet)

		app.listen(PORT, () => {
			console.log(chalk.yellow(`🚀 Сервер запущен на http://localhost:${PORT}`))
		})
	} catch (error) {
		console.error(chalk.red('❌ Ошибка запуска сервера:'), error)
		process.exit(1)
	}
}

startServer()
