import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'

export const defaultAppMiddleware = (app: Express): void => {
	// JSON
	app.use(express.json())
	app.use(
		cors({
			origin: 'http://localhost:5173',
			credentials: true,
		})
	)
	/*
		Регистрирует промежуточное ПО для обработки данных в кодировке 
		URL для всех входящих запросов
	*/
	app.use(
		express.urlencoded({
			extended: true,
		})
	)

	// Для работы  cookie с express
	app.use(cookieParser())

	// Глобальный обработчик ошибок
	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		console.error(err.stack)
		res
			.status(500)
			.send({ error: 'Something went wrong', message: err.message })
		next()
	})
}
