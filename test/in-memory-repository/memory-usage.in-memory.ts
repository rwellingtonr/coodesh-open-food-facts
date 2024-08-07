import type { MemoryUsage, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import type { FindMemoryUsage } from '@/application/contracts'
import type { AbsMemoryUsageRepository } from '@/application/repository'

export class MemoryUsageInMemory implements AbsMemoryUsageRepository {
	memoryUsage: MemoryUsage[]
	constructor() {
		this.memoryUsage = []
	}
	async create(memoryUsage: Prisma.MemoryUsageUncheckedCreateInput): Promise<void> {
		this.memoryUsage.push({
			...memoryUsage,
			id: randomUUID(),
		})
	}
	async findById(id: string): Promise<MemoryUsage | null> {
		return this.memoryUsage.find((memoryUsage) => memoryUsage.id === id)
	}
	async findMemoryUsageInProcess(processIds: string): Promise<FindMemoryUsage> {
		return this.memoryUsage.find((memoryUsage) => memoryUsage.processing_status_id === processIds)
	}
}
