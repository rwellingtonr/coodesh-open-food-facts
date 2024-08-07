import {
	type ArgumentsHost,
	Catch,
	type ExceptionFilter,
	HttpException,
	Logger,
} from '@nestjs/common'
import { AxiosError } from 'axios'
import type { Request, Response } from 'express'

@Catch()
export class CatchErrorMiddleware implements ExceptionFilter {
	private readonly logger = new Logger(CatchErrorMiddleware.name)

	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()
		const request = ctx.getRequest<Request>()

		if (exception instanceof AxiosError) {
			this.logger.error(`An error occurred when handling the request: ${exception.message}`)

			const statusCode = exception?.response?.status || 400
			const errorMessage = exception?.response?.data || 'ECONNREFUSED'

			return response.status(statusCode).json({
				statusCode,
				timestamp: new Date().toISOString(),
				path: request.url,
				message: errorMessage,
			})
		}

		if (/prisma/gm.test(exception?.message)) {
			return response.status(400).send({
				statusCode: 400,
				timestamp: new Date().toISOString(),
				path: request.url,
				message: exception.message,
			})
		}

		if (exception instanceof HttpException) {
			const status = exception.getStatus()
			this.logger.error(`An error occurred when handling the request: ${exception.message}`)
			return response.status(status).json({
				statusCode: status,
				timestamp: new Date().toISOString(),
				path: request.url,
				message: exception.getResponse(),
			})
		}

		if (exception instanceof Error) {
			this.logger.error(`An error occurred when handling the request: ${exception.message}`)
			return response.status(400).json({
				statusCode: 400,
				timestamp: new Date().toISOString(),
				path: request.url,
				message: JSON.stringify(exception),
			})
		}

		return response.status(500).json({
			statusCode: 500,
			timestamp: new Date().toISOString(),
			path: request.url,
			message: 'Internal server error',
		})
	}
}
