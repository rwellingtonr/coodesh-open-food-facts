import { faker } from '@faker-js/faker'
import { NotFoundException } from '@nestjs/common'
import { ProductsInMemory } from '@test/in-memory-repository/products.in-memory'
import { makeProducts } from '@test/utils/make-products.utils'

import { GetProductUseCase } from './get-product.use-case'

describe('GetProductUseCase', () => {
	let repository: ProductsInMemory
	let sut: GetProductUseCase

	beforeEach(async () => {
		repository = new ProductsInMemory()
		sut = new GetProductUseCase(repository)

		await repository.create(makeProducts())
	})

	it('should successfully get product by its code', async () => {
		const result = await sut.execute({ code: repository.products[0].code })
		expect(result.code).toBe(repository.products[0].code)
	})

	it('should handle error due not found code', async () => {
		await expect(sut.execute({ code: faker.string.numeric() })).rejects.toThrow(NotFoundException)
	})
})
