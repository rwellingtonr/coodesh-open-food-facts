import type { MemoryUsage, Prisma } from '@prisma/client'

export abstract class AbsMemoryUsageRepository {
	abstract create(memoryUsage: Prisma.MemoryUsageUncheckedCreateInput): Promise<void>
	abstract findById(id: string): Promise<MemoryUsage | null>
}
