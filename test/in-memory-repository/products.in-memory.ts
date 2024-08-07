import type { Prisma, Product } from '@prisma/client'
import { randomUUID } from 'crypto'

import type { Paginate } from '@/application/contracts'
import type { AbsProductsRepository, FindManyProps } from '@/application/repository'

export class ProductsInMemory implements AbsProductsRepository {
	products: Product[]

	constructor() {
		this.products = []
	}

	async create(product: Prisma.ProductUncheckedCreateInput): Promise<void> {
		this.products.push({
			url: product.url,
			creator: product.creator,
			created_t: +product.created_t || Date.now(),
			last_modified_t: +product.last_modified_t || Date.now(),
			status: 'draft',
			brands: product.brands,
			categories: product.categories,
			labels: product.labels,
			cities: product.cities,
			purchase_places: product.purchase_places,
			stores: product.stores,
			ingredients_text: product.ingredients_text,
			traces: product.traces,
			serving_size: product.serving_size,
			serving_quantity: +product.serving_quantity,
			nutriscore_score: +product.nutriscore_score,
			nutriscore_grade: product.nutriscore_grade,
			main_category: product.main_category,
			image_url: product.image_url,
			imported_t: new Date().toISOString(),
			product_name: product.product_name,
			quantity: product.quantity,
			code: product.code,
			id: randomUUID(),
		})
	}
	async findUniqueCode(code: string): Promise<Product | null> {
		return this.products.find((product) => product.code === code)
	}
	async update(id: string, product: Prisma.ProductUncheckedUpdateInput): Promise<void> {
		const index = this.products.findIndex((p) => p.id === id)

		if (index < 0) {
			throw new Error('Processing status not found')
		}
		Object.entries(product).forEach(([key, value]) => {
			this.products[index][key] = value
		})
	}
	async findMany({ limit, page }: FindManyProps): Promise<Paginate<Product>> {
		const items = this.products.slice((page - 1) * limit, limit)
		return {
			items,
			pagination: {
				total: this.products.length,
				totalPages: Math.ceil(this.products.length / limit),
				page,
				limit,
			},
		}
	}
}
