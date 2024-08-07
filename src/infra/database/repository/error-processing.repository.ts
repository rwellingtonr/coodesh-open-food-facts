import { Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'

import type { FindErrorsProcessing } from '@/application/contracts'
import type { AbsErrorsProcessingRepository } from '@/application/repository'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ErrorProcessingRepository implements AbsErrorsProcessingRepository {
	constructor(private readonly prisma: PrismaService) {}
	async create(errorCode: Prisma.ErrorCodesUncheckedCreateInput): Promise<void> {
		await this.prisma.errorCodes.create({ data: errorCode })
	}

	async findManyErrosInProcess(processId: string): Promise<FindErrorsProcessing[]> {
		const errorsProcessing = await this.prisma.errorCodes.findMany({
			where: {
				processing_status_id: processId,
			},
			select: {
				code: true,
				message: true,
				created_t: true,
			},
		})

		return errorsProcessing
	}
}
