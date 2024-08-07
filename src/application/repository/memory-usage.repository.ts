import type { MemoryUsage, Prisma } from '@prisma/client'

import type { FindMemoryUsage } from '../contracts/memory-usage.contract'

export abstract class AbsMemoryUsageRepository {
	abstract create(memoryUsage: Prisma.MemoryUsageUncheckedCreateInput): Promise<void>
	abstract findById(id: string): Promise<MemoryUsage | null>
	abstract findMemoryUsageInProcess(processIds: string): Promise<FindMemoryUsage>
}
