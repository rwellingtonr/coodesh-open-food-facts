import { ProductsInMemory } from '@test/in-memory-repository/products.in-memory'
import { makeProducts } from '@test/utils/make-products.utils'

import { GetAllProductsUseCase } from './get-all-products.use-case'

describe('GetAllProductsUseCase', () => {
	let repository: ProductsInMemory
	let sut: GetAllProductsUseCase

	beforeEach(async () => {
		repository = new ProductsInMemory()
		sut = new GetAllProductsUseCase(repository)
	})

	it('should successfully get 10 items paginated', async () => {
		for (let i = 0; i < 10; i++) {
			await repository.create(makeProducts())
		}

		const result = await sut.execute({ page: 1, limit: 10 })
		expect(result.items).toHaveLength(10)
		expect(result.pagination).toEqual(
			expect.objectContaining({
				total: 10,
				totalPages: 1,
				page: 1,
				limit: 10,
			}),
		)
	})

	it('should not display any item and pagination should be 1', async () => {
		const result = await sut.execute({ page: 1, limit: 10 })
		expect(result.items).toHaveLength(0)
		expect(result.pagination).toEqual(
			expect.objectContaining({
				total: 0,
				totalPages: 0,
				page: 1,
				limit: 10,
			}),
		)
	})
})
