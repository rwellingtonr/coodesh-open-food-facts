import type { Readable } from 'node:stream'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as readline from 'readline'
import * as zlib from 'zlib'

import type { JsonRow } from '@/application/contracts'
import { HttpGatewayContracts } from '@/application/gateway/http-gateway.contracts'
import {
	AbsErrorsProcessingRepository,
	AbsMemoryUsageRepository,
	AbsProcessingStatusRepository,
	AbsProductsRepository,
} from '@/application/repository'

@Injectable()
export class SyncProductsUseCase {
	private readonly challengesBaseUrl: string
	private readonly maxRowsPerFile: number

	constructor(
		private readonly processingStatusRepository: AbsProcessingStatusRepository,
		private readonly memoryUsageRepository: AbsMemoryUsageRepository,
		private readonly productsRepository: AbsProductsRepository,
		private readonly errorsProcessingRepository: AbsErrorsProcessingRepository,
		private readonly httpGatewayService: HttpGatewayContracts,
		private readonly configService: ConfigService,
	) {
		this.challengesBaseUrl = this.configService.get<string>('CHALLENGES_BASE_URL')
		this.maxRowsPerFile = 100
	}

	async execute() {
		const filesTextResponse = await this.httpGatewayService.get<string>(
			`${this.challengesBaseUrl}/index.txt`,
		)

		const files = filesTextResponse.split('\n').filter(Boolean)

		for (const file of files) {
			const initialMemoryUsage = process.memoryUsage()

			const processingStatus = await this.processingStatusRepository.create({
				filename: file,
				status: 'processing',
				starting_processing_at: new Date().toISOString(),
			})

			const readable = await this.httpGatewayService.get<Readable>(
				`${this.challengesBaseUrl}/${file}`,
				{
					responseType: 'stream',
				},
			)

			const gunzip = zlib.createGunzip()
			const jsonStream = readable.pipe(gunzip)
			const rl = readline.createInterface({
				input: jsonStream,
				crlfDelay: Infinity,
			})

			let lineCount = 0

			rl.on('line', async (line) => {
				if (lineCount < this.maxRowsPerFile) {
					const json: JsonRow = JSON.parse(line)
					try {
						const productFound = await this.productsRepository.findUniqueCode(+json.code)

						const dataToUpsert = {
							url: json.url,
							creator: json.creator,
							created_t: +json.created_datetime,
							last_modified_t: +json.last_modified_datetime,
							status: 'draft',
							brands: json.brands,
							categories: json.categories,
							labels: json.labels,
							cities: json.cities,
							purchase_places: json.purchase_places,
							stores: json.stores,
							ingredients_text: json.ingredients_text,
							traces: json.traces,
							serving_size: json.serving_size,
							serving_quantity: +json.serving_quantity,
							nutriscore_score: +json.nutriscore_score,
							nutriscore_grade: json.nutriscore_grade,
							main_category: json.main_category,
							image_url: json.image_url,
							imported_t: new Date().toISOString(),
							product_name: json.product_name,
							quantity: json.quantity,
						}

						if (productFound) {
							await this.productsRepository.update(productFound.id, dataToUpsert)
							return
						}

						await this.productsRepository.create({ ...dataToUpsert, code: +json.code })

						lineCount++
					} catch (error) {
						await this.errorsProcessingRepository.create({
							code: +json.code,
							created_t: Date.now(),
							message: JSON.stringify(error),
							processing_status_id: processingStatus.id,
						})
						console.error('Erro ao processar linha JSON:', error)
					}
				} else {
					rl.close()
				}
			}).on('close', async () => {
				readable.destroy()

				const finalMemoryUsage = process.memoryUsage()

				await Promise.all([
					this.processingStatusRepository.update(processingStatus.id, {
						processed_at: new Date().toISOString(),
						status: 'processed',
					}),
					this.memoryUsageRepository.create({
						processing_status_id: processingStatus.id,
						rss: (finalMemoryUsage.rss - initialMemoryUsage.rss).toString(),
						heapTotal: (finalMemoryUsage.heapTotal - initialMemoryUsage.heapTotal).toString(),
						heapUsed: (finalMemoryUsage.heapUsed - initialMemoryUsage.heapUsed).toString(),
						external: (finalMemoryUsage.external - initialMemoryUsage.external).toString(),
					}),
				])
			})

			jsonStream.on('error', (err: Error) => {
				console.error('Erro durante a descompressão ou processamento:', err)
			})
		}
	}
}
