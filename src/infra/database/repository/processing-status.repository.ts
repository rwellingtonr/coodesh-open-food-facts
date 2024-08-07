import { Injectable } from '@nestjs/common'
import type { Prisma, ProcessingStatus } from '@prisma/client'

import type { AbsProcessingStatusRepository } from '@/application/repository'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ProcessingStatusRepository implements AbsProcessingStatusRepository {
	constructor(private readonly prisma: PrismaService) {}
	async create(
		processingStatus: Prisma.ProcessingStatusUncheckedCreateInput,
	): Promise<ProcessingStatus> {
		const created = await this.prisma.processingStatus.create({ data: processingStatus })
		return created
	}

	async update(
		id: string,
		processingStatus: Prisma.ProcessingStatusUncheckedUpdateInput,
	): Promise<void> {
		await this.prisma.processingStatus.update({ data: processingStatus, where: { id } })
	}

	async getLastFilesProcessed(): Promise<ProcessingStatus[]> {
		const lastFilesProcessed = await this.prisma.processingStatus.findMany({
			orderBy: {
				processed_at: 'desc',
			},
			distinct: ['filename'],
		})
		return lastFilesProcessed
	}
}
