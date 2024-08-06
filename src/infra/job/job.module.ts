import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { SyncProductsUseCase } from '@/application/use-case/sync'

import { DatabaseModule } from '../database/database.module'
import { HttpGatewayModule } from '../gateway/http-gateway.module'
import { SyncProductsJob } from './sync-products.job'

@Module({
	imports: [DatabaseModule, HttpGatewayModule, ConfigModule],
	providers: [SyncProductsJob, SyncProductsUseCase],
})
export class JobModule {}
