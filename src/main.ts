import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'

import { AppModule } from './app.module'
import { CatchErrorMiddleware } from './infra/middleware/catch.middleware'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true })

	app.useGlobalFilters(new CatchErrorMiddleware())
	app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

	app.setGlobalPrefix('v1')

	const config = new DocumentBuilder()
		.setTitle('Open Food Facts')
		.setDescription('Nutritional facts for foods API')
		.setVersion('1.0')
		.addApiKey(
			{
				type: 'apiKey',
				name: 'api-key',
				in: 'header',
			},
			'api-key',
		)
		.build()

	app.use(
		helmet({
			crossOriginEmbedderPolicy: false,
			contentSecurityPolicy: {
				directives: {
					imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
					scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
					manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
					frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
				},
			},
		}),
	)

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api-docs', app, document)

	const configService = app.get(ConfigService)
	const port = configService.get<string>('PORT')

	await app.listen(port, () => console.log(`Server running process ${process.pid} on port ${port}`))
}
bootstrap()
