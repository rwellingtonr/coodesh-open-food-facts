import { Module } from '@nestjs/common'

import {
	GetAllProductsUseCase,
	GetProductUseCase,
	PatchStatusUseCase,
	UpdateProductUseCase,
} from '@/application/use-case/products'

import { DatabaseModule } from '../database/database.module'
import { HealthController } from './health/health.controller'
import { ProductsController } from './product/products.controller'

@Module({
	imports: [DatabaseModule],
	controllers: [ProductsController, HealthController],
	providers: [GetAllProductsUseCase, GetProductUseCase, PatchStatusUseCase, UpdateProductUseCase],
})
export class ControllerModule {}
