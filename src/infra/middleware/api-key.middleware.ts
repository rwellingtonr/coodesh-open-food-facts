import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ApiKeyMiddleware implements CanActivate {
	constructor(private readonly configService: ConfigService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()

		const apiKeyRequest = request.headers['api-key'] // give the name you want

		if (!apiKeyRequest) {
			throw new UnauthorizedException('API key is missing.')
		}

		const apiKey = this.configService.get('API_KEY')

		// call your env. var the name you want
		if (apiKeyRequest !== apiKey) {
			throw new UnauthorizedException('Invalid API key.')
		}

		return true
	}
}
