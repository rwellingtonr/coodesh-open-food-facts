import { Injectable } from '@nestjs/common'

import { AbsProductsRepository } from '@/application/repository'

type GetAllProductsUseCaseProps = {
	page: number
	limit: number
}

@Injectable()
export class GetAllProductsUseCase {
	constructor(private readonly productsRepository: AbsProductsRepository) {}

	async execute(props: GetAllProductsUseCaseProps) {
		const result = await this.productsRepository.findMany(props)

		return result
	}
}
