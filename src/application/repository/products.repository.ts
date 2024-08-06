import type { Prisma, Product } from '@prisma/client'

import type { Paginate } from '../contracts'

export type FindManyProps = {
	page: number
	limit: number
}

export abstract class AbsProductsRepository {
	abstract create(product: Prisma.ProductUncheckedCreateInput): Promise<void>
	abstract findUniqueCode(code: number): Promise<Product | null>
	abstract update(id: string, product: Prisma.ProductUncheckedUpdateInput): Promise<void>
	abstract findMany(props: FindManyProps): Promise<Paginate<Product>>
}
