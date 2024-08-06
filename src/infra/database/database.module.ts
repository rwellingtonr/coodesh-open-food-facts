import { Module } from '@nestjs/common'

import {
	AbsErrorsProcessingRepository,
	AbsMemoryUsageRepository,
	AbsProcessingStatusRepository,
	AbsProductsRepository,
} from '@/application/repository'

import { PrismaService } from './prisma/prisma.service'
import {
	ErrorProcessingRepository,
	MemoryUsageRepository,
	ProcessingStatusRepository,
	ProductsRepository,
} from './repository'

@Module({
	providers: [
		PrismaService,
		{
			provide: AbsProductsRepository,
			useClass: ProductsRepository,
		},
		{
			provide: AbsProcessingStatusRepository,
			useClass: ProcessingStatusRepository,
		},
		{
			provide: AbsMemoryUsageRepository,
			useClass: MemoryUsageRepository,
		},
		{
			provide: AbsErrorsProcessingRepository,
			useClass: ErrorProcessingRepository,
		},
	],
	exports: [
		PrismaService,
		AbsProductsRepository,
		AbsProcessingStatusRepository,
		AbsMemoryUsageRepository,
		AbsErrorsProcessingRepository,
	],
})
export class DatabaseModule {}
