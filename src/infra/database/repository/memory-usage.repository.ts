import { Injectable } from '@nestjs/common'
import type { MemoryUsage, Prisma } from '@prisma/client'

import type { FindMemoryUsage } from '@/application/contracts'
import type { AbsMemoryUsageRepository } from '@/application/repository'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class MemoryUsageRepository implements AbsMemoryUsageRepository {
	constructor(private readonly prisma: PrismaService) {}
	async create(memoryUsage: Prisma.MemoryUsageUncheckedCreateInput): Promise<void> {
		await this.prisma.memoryUsage.create({ data: memoryUsage })
	}
	async findById(id: string): Promise<MemoryUsage | null> {
		const memoryUsage = await this.prisma.memoryUsage.findUnique({ where: { id } })
		return memoryUsage
	}

	async findMemoryUsageInProcess(processId: string): Promise<FindMemoryUsage> {
		const memoryUsage = await this.prisma.memoryUsage.findUnique({
			where: {
				processing_status_id: processId,
			},
			select: {
				rss: true,
				heapTotal: true,
				heapUsed: true,
				external: true,
			},
		})
		return memoryUsage
	}
}
