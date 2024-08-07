import { Injectable } from '@nestjs/common'

import type { FindErrorsProcessing, FindMemoryUsage } from '@/application/contracts'
import {
	AbsErrorsProcessingRepository,
	AbsMemoryUsageRepository,
	AbsProcessingStatusRepository,
} from '@/application/repository'
import { formatMemoryDisplay } from '@/common/utils/format-memory-display.utils'

type FileResponse = {
	filename: string
	processing_time: number
	status: string
	memory_usage: FindMemoryUsage
	errors: FindErrorsProcessing[]
}

type CheckHealthUseCaseResponse = {
	database_status: string
	files: FileResponse[]
}

@Injectable()
export class CheckHealthUseCase {
	constructor(
		private readonly processingStatusRepository: AbsProcessingStatusRepository,
		private readonly memoryUsageRepository: AbsMemoryUsageRepository,
		private readonly errorsProcessingRepository: AbsErrorsProcessingRepository,
	) {}

	async execute(): Promise<CheckHealthUseCaseResponse> {
		const lastFilesProcessed = await this.processingStatusRepository.getLastFilesProcessed()

		const files: FileResponse[] = []
		try {
			for (const fileProcessed of lastFilesProcessed) {
				const [memoryUsage, errorsProcessing] = await Promise.all([
					this.memoryUsageRepository.findMemoryUsageInProcess(fileProcessed.id),
					this.errorsProcessingRepository.findManyErrosInProcess(fileProcessed.id),
				])

				const processingTime =
					new Date(fileProcessed.processed_at).getTime() -
					new Date(fileProcessed.starting_processing_at).getTime()

				files.push({
					filename: fileProcessed.filename,
					processing_time: processingTime,
					status: fileProcessed.status,
					memory_usage: {
						rss: formatMemoryDisplay(memoryUsage.rss),
						heapTotal: formatMemoryDisplay(memoryUsage.heapTotal),
						heapUsed: formatMemoryDisplay(memoryUsage.heapUsed),
						external: formatMemoryDisplay(memoryUsage.external),
					},
					errors: errorsProcessing,
				})
			}

			return {
				database_status: 'OK',
				files,
			}
		} catch (error) {
			return {
				database_status: 'NOK',
				files: [],
			}
		}
	}
}
