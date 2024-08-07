import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

import { SyncProductsUseCase } from '@/application/use-case/sync'

const cronTime = process.env.CRON_TIME || 'EVERY_DAY_AT_11PM'

@Injectable()
export class SyncProductsJob {
	private readonly logger = new Logger(SyncProductsJob.name)

	constructor(private readonly syncProductsUseCase: SyncProductsUseCase) {}

	@Cron(CronExpression[cronTime], {
		name: 'sync-products',
	})
	async handle() {
		this.logger.log('Syncing products...')
		await this.syncProductsUseCase.execute()
	}
}
