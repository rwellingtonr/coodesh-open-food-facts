import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

import { SyncProductsUseCase } from '@/application/use-case/sync'

@Injectable()
export class SyncProductsJob {
	private readonly logger = new Logger(SyncProductsJob.name)

	constructor(private readonly syncProductsUseCase: SyncProductsUseCase) {}

	@Cron(CronExpression.EVERY_DAY_AT_11AM)
	async handle() {
		this.logger.log('Called when the current second is 45')
		await this.syncProductsUseCase.execute()
	}
}
