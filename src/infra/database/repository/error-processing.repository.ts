import { Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'

import type { AbsErrorsProcessingRepository } from '@/application/repository'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ErrorProcessingRepository implements AbsErrorsProcessingRepository {
	constructor(private readonly prisma: PrismaService) {}
	async create(errorCode: Prisma.ErrorCodesUncheckedCreateInput): Promise<void> {
		await this.prisma.errorCodes.create({ data: errorCode })
	}
}
