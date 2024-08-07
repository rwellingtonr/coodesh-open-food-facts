import { faker } from '@faker-js/faker'
import { NotFoundException } from '@nestjs/common'
import { ProductsInMemory } from '@test/in-memory-repository/products.in-memory'
import { makeProducts } from '@test/utils/make-products.utils'

import { UpdateProductUseCase } from './update-product.use-case'

describe('UpdateProductUseCase', () => {
	let repository: ProductsInMemory
	let sut: UpdateProductUseCase

	beforeEach(async () => {
		repository = new ProductsInMemory()
		sut = new UpdateProductUseCase(repository)

		await repository.create(makeProducts())
	})

	it('should successfully update status to published', async () => {
		await sut.execute({ code: repository.products[0].code, body: { status: 'published' } })
		expect(repository.products[0].status).toBe('published')
	})

	it('should handle error due not found code', async () => {
		await expect(
			sut.execute({ code: faker.string.numeric(), body: { status: 'published' } }),
		).rejects.toThrow(NotFoundException)
	})
})
