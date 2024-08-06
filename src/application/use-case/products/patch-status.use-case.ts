import { Injectable, NotFoundException } from '@nestjs/common'

import { AbsProductsRepository } from '@/application/repository'

type PatchStatusUseCaseProps = {
	code: number
}

@Injectable()
export class PatchStatusUseCase {
	constructor(private readonly productsRepository: AbsProductsRepository) {}

	async execute({ code }: PatchStatusUseCaseProps) {
		const product = await this.productsRepository.findUniqueCode(+code)

		if (!product) {
			throw new NotFoundException(`Product with code ${code} not found`)
		}

		await this.productsRepository.update(product.id, { status: 'trash' })
	}
}
