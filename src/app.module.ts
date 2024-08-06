import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { ThrottlerModule } from '@nestjs/throttler'

import { ControllerModule } from './infra/controller/controller.module'
import { DatabaseModule } from './infra/database/database.module'
import { HttpGatewayModule } from './infra/gateway/http-gateway.module'
import { JobModule } from './infra/job/job.module'

@Module({
	imports: [
		ThrottlerModule.forRoot([
			{
				ttl: 10000,
				limit: 20,
			},
		]),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ScheduleModule.forRoot(),
		HttpGatewayModule,
		DatabaseModule,
		JobModule,
		ControllerModule,
	],
})
export class AppModule {}
