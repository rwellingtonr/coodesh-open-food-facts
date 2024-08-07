import type { Prisma, ProcessingStatus } from '@prisma/client'

export abstract class AbsProcessingStatusRepository {
	abstract create(
		processingStatus: Prisma.ProcessingStatusUncheckedCreateInput,
	): Promise<ProcessingStatus>
	abstract update(
		id: string,
		processingStatus: Prisma.ProcessingStatusUncheckedUpdateInput,
	): Promise<void>

	abstract getLastFilesProcessed(): Promise<ProcessingStatus[]>
}
