import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { HttpGatewayContracts } from '@/application/gateway/http-gateway.contracts'

import { HttpGatewayService } from './http-gateway.service'

@Module({
	imports: [HttpModule],
	providers: [
		{
			provide: HttpGatewayContracts,
			useClass: HttpGatewayService,
		},
	],
	exports: [HttpGatewayContracts],
})
export class HttpGatewayModule {}
