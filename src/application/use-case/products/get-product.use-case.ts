import { Injectable, NotFoundException } from '@nestjs/common'

import { AbsProductsRepository } from '@/application/repository'

type GetProductUseCaseProps = {
	code: number
}

@Injectable()
export class GetProductUseCase {
	constructor(private readonly productsRepository: AbsProductsRepository) {}

	async execute({ code }: GetProductUseCaseProps) {
		const result = await this.productsRepository.findUniqueCode(+code)

		if (!result) {
			throw new NotFoundException(`Product with code ${code} not found`)
		}

		return result
	}
}
