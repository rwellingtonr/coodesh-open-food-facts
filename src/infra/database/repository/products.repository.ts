import { Injectable } from '@nestjs/common'
import type { Prisma, Product } from '@prisma/client'

import type { Paginate } from '@/application/contracts'
import type { AbsProductsRepository, FindManyProps } from '@/application/repository'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ProductsRepository implements AbsProductsRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(product: Prisma.ProductUncheckedCreateInput): Promise<void> {
		await this.prisma.product.create({ data: product })
	}
	async findUniqueCode(code: string): Promise<Product | null> {
		const found = await this.prisma.product.findUnique({ where: { code } })
		return found
	}

	async update(id: string, product: Prisma.ProductUncheckedUpdateInput): Promise<void> {
		await this.prisma.product.update({ data: product, where: { id } })
	}

	async findMany({ limit, page }: FindManyProps): Promise<Paginate<Product>> {
		const [items, total] = await Promise.all([
			this.prisma.product.findMany({
				skip: (page - 1) * limit,
				take: limit,
				orderBy: {
					created_t: 'desc',
				},
			}),
			this.prisma.product.count(),
		])

		return {
			items,
			pagination: {
				total,
				totalPages: Math.ceil(total / limit),
				page,
				limit,
			},
		}
	}
}
