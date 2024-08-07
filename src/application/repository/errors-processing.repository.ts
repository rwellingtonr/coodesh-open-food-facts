import type { Prisma } from '@prisma/client'

import type { FindErrorsProcessing } from '../contracts'

export abstract class AbsErrorsProcessingRepository {
	abstract create(errorCode: Prisma.ErrorCodesUncheckedCreateInput): Promise<void>
	abstract findManyErrosInProcess(processId: string): Promise<FindErrorsProcessing[]>
}
