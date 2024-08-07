import { faker } from '@faker-js/faker'
import { NotFoundException } from '@nestjs/common'
import { ProductsInMemory } from '@test/in-memory-repository/products.in-memory'
import { makeProducts } from '@test/utils/make-products.utils'

import { PatchStatusUseCase } from './patch-status.use-case'

describe('PatchStatusUseCase', () => {
	let repository: ProductsInMemory
	let sut: PatchStatusUseCase

	beforeEach(async () => {
		repository = new ProductsInMemory()
		sut = new PatchStatusUseCase(repository)

		await repository.create(makeProducts())
	})

	it('should successfully patch status to trash', async () => {
		await sut.execute({ code: repository.products[0].code })
		expect(repository.products[0].status).toBe('trash')
	})

	it('should handle error due not found code', async () => {
		await expect(sut.execute({ code: faker.string.numeric() })).rejects.toThrow(NotFoundException)
	})
})
