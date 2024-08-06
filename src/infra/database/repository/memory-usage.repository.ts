import { Injectable } from '@nestjs/common'
import type { MemoryUsage, Prisma } from '@prisma/client'

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
}
