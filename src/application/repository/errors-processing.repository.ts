import type { Prisma } from '@prisma/client'

export abstract class AbsErrorsProcessingRepository {
	abstract create(errorCode: Prisma.ErrorCodesUncheckedCreateInput): Promise<void>
}
