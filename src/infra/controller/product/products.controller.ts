import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common'
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import {
	GetAllProductsUseCase,
	GetProductUseCase,
	PatchStatusUseCase,
	UpdateProductUseCase,
} from '@/application/use-case/products'
import { ApiPaginatedResponse } from '@/common/decorator/paginate.decorator'

import { type GetAllProductsDto, GetProductResponseDto, type UpdateProductDto } from './dto'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
	constructor(
		private readonly getAllProductsUseCase: GetAllProductsUseCase,
		private readonly getProductUseCase: GetProductUseCase,
		private readonly patchStatusUseCase: PatchStatusUseCase,
		private readonly updateProductUseCase: UpdateProductUseCase,
	) {}

	@ApiPaginatedResponse(GetProductResponseDto)
	@Get()
	async getAllProducts(@Query() query: GetAllProductsDto) {
		const result = await this.getAllProductsUseCase.execute(query)

		return result
	}

	@ApiOkResponse({ type: GetProductResponseDto })
	@ApiNotFoundResponse({ description: 'Product not found' })
	@Get(':code')
	async getProduct(@Param('code') code: number) {
		const result = await this.getProductUseCase.execute({ code })
		return result
	}

	@ApiOkResponse({ description: 'OK' })
	@ApiNotFoundResponse({ description: 'Product not found' })
	@Delete(':code')
	async patchStatus(@Param('code') code: number) {
		await this.patchStatusUseCase.execute({ code })
		return
	}

	@ApiOkResponse({ description: 'OK' })
	@ApiNotFoundResponse({ description: 'Product not found' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	@Put(':code')
	async updateProduct(@Param('code') code: number, @Body() body: UpdateProductDto) {
		await this.updateProductUseCase.execute({ code, body })
		return
	}
}
