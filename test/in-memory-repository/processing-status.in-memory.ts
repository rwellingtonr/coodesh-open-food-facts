import type { Prisma, ProcessingStatus } from '@prisma/client'
import { randomUUID } from 'crypto'

import type { AbsProcessingStatusRepository } from '@/application/repository'

export class ProcessingStatusInMemory implements AbsProcessingStatusRepository {
	processingStatus: ProcessingStatus[]

	constructor() {
		this.processingStatus = []
	}
	async create(
		processingStatus: Prisma.ProcessingStatusUncheckedCreateInput,
	): Promise<ProcessingStatus> {
		const toCreate = {
			filename: processingStatus.filename,
			starting_processing_at: new Date(processingStatus.starting_processing_at),
			processed_at: new Date(processingStatus.processed_at),
			status: processingStatus.status,
			id: randomUUID(),
		}
		this.processingStatus.push(toCreate)
		return toCreate
	}
	async update(
		id: string,
		processingStatus: Prisma.ProcessingStatusUncheckedUpdateInput,
	): Promise<void> {
		const index = this.processingStatus.findIndex((processingStatus) => processingStatus.id === id)

		if (index < 0) {
			throw new Error('Processing status not found')
		}
		Object.entries(processingStatus).forEach(([key, value]) => {
			this.processingStatus[index][key] = value
		})
	}
	async getLastFilesProcessed(): Promise<ProcessingStatus[]> {
		return this.processingStatus.sort((a, b) => {
			return (
				new Date(a.processed_at.toString()).getTime() -
				new Date(b.processed_at.toString()).getTime()
			)
		})
	}
}
