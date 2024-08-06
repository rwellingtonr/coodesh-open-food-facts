import { Injectable, NotFoundException } from '@nestjs/common'

import { AbsProductsRepository } from '@/application/repository'
import type { UpdateProductDto } from '@/infra/controller/product/dto'

type UpdateProductUseCaseProps = {
	code: number
	body: UpdateProductDto
}

@Injectable()
export class UpdateProductUseCase {
	constructor(private readonly productsRepository: AbsProductsRepository) {}

	async execute({ code, body }: UpdateProductUseCaseProps) {
		const product = await this.productsRepository.findUniqueCode(+code)

		if (!product) {
			throw new NotFoundException(`Product with code ${code} not found`)
		}

		await this.productsRepository.update(product.id, body)
	}
}
