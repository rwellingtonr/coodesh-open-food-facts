import type { AxiosRequestConfig } from 'axios'

export abstract class HttpGatewayContracts {
	abstract get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>
}
