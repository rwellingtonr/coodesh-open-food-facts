import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true })

	const config = new DocumentBuilder()
		.setTitle('Open Food Facts')
		.setDescription('Nutritional facts for foods API')
		.setVersion('1.0')
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

	await app.listen(3000)
}
bootstrap()
