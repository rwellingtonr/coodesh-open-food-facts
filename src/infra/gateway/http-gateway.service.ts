import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import type { AxiosRequestConfig } from 'axios'

import type { HttpGatewayContracts } from '@/application/gateway/http-gateway.contracts'

@Injectable()
export class HttpGatewayService implements HttpGatewayContracts {
	constructor(private readonly httpService: HttpService) {}

	async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.httpService.axiosRef.get(url, config)
		return response.data
	}
}
