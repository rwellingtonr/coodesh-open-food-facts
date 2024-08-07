import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from '@nestjs/common'
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiSecurity,
	ApiTags,
} from '@nestjs/swagger'

import {
	GetAllProductsUseCase,
	GetProductUseCase,
	PatchStatusUseCase,
	UpdateProductUseCase,
} from '@/application/use-case/products'
import { ApiPaginatedResponse } from '@/common/decorator/paginate.decorator'
import { ApiKeyMiddleware } from '@/infra/middleware/api-key.middleware'

import { GetAllProductsDto, GetCodeDto, GetProductResponseDto, UpdateProductDto } from './dto'

@ApiTags('Products')
@ApiSecurity('api-key')
@UseGuards(ApiKeyMiddleware)
@Controller('products')
export class ProductsController {
	constructor(
		private readonly getAllProductsUseCase: GetAllProductsUseCase,
		private readonly getProductUseCase: GetProductUseCase,
		private readonly patchStatusUseCase: PatchStatusUseCase,
		private readonly updateProductUseCase: UpdateProductUseCase,
	) {}

	@ApiPaginatedResponse(GetProductResponseDto)
	@ApiOperation({
		summary: 'Get all products',
		description: 'Get all products paginated',
	})
	@Get()
	async getAllProducts(@Query() query: GetAllProductsDto) {
		const result = await this.getAllProductsUseCase.execute(query)

		return result
	}

	@ApiOperation({
		summary: 'Get a product by its code',
		description: 'Get a product by a given code',
	})
	@ApiOkResponse({ type: GetProductResponseDto })
	@ApiNotFoundResponse({ description: 'Product not found' })
	@Get(':code')
	async getProduct(@Param() { code }: GetCodeDto) {
		const result = await this.getProductUseCase.execute({ code })
		return result
	}

	@ApiOperation({
		summary: 'Set product status to trash',
		description: 'Change the product status to trash',
	})
	@ApiOkResponse({ description: 'OK' })
	@ApiNotFoundResponse({ description: 'Product not found' })
	@Delete(':code')
	async patchStatus(@Param() { code }: GetCodeDto) {
		await this.patchStatusUseCase.execute({ code })
		return
	}

	@ApiOperation({
		summary: 'Update a product',
		description: 'Change some fields of a product',
	})
	@ApiOkResponse({ description: 'OK' })
	@ApiNotFoundResponse({ description: 'Product not found' })
	@ApiBadRequestResponse({ description: 'Bad request' })
	@Put(':code')
	async updateProduct(@Param() { code }: GetCodeDto, @Body() body: UpdateProductDto) {
		await this.updateProductUseCase.execute({ code, body })
		return
	}
}
