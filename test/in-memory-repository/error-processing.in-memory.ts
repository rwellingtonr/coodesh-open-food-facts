import type { ErrorCodes, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import type { FindErrorsProcessing } from '@/application/contracts'
import type { AbsErrorsProcessingRepository } from '@/application/repository'

export class ErrorProcessingInMemory implements AbsErrorsProcessingRepository {
	errorProcessing: ErrorCodes[]

	constructor() {
		this.errorProcessing = []
	}

	async create(errorCode: Prisma.ErrorCodesUncheckedCreateInput): Promise<void> {
		this.errorProcessing.push({
			code: errorCode.code,
			message: errorCode.message,
			created_t: errorCode.created_t,
			processing_status_id: errorCode.processing_status_id,
			id: randomUUID(),
		})
	}
	async findManyErrosInProcess(processId: string): Promise<FindErrorsProcessing[]> {
		return this.errorProcessing
			.filter((err) => err.processing_status_id === processId)
			.map((err) => ({
				code: err.code,
				message: err.message,
				created_t: err.created_t,
			}))
	}
}
