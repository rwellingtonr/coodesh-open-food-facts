import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Health')
@Controller()
export class HealthController {
	constructor() {}
}
