import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger'

import { CheckHealthUseCase } from '@/application/use-case/health'
import { ApiKeyMiddleware } from '@/infra/middleware/api-key.middleware'

import { CheckHealthDto } from './dto/check-health.dto'

@ApiTags('Health')
@UseGuards(ApiKeyMiddleware)
@ApiSecurity('api-key')
@Controller()
export class HealthController {
	constructor(private readonly checkHealthUseCase: CheckHealthUseCase) {}

	@ApiOkResponse({ type: CheckHealthDto })
	@ApiOperation({
		summary: 'Check health of processing and job and database',
		description: 'Get the latest files processed and the status of the processing and job',
	})
	@Get()
	async checkHealth() {
		const result = await this.checkHealthUseCase.execute()
		return result
	}
}
