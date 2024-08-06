export type Pagination = {
	page: number
	limit: number
	total: number
	totalPages: number
}

export type Paginate<T> = {
	items: T[]
	pagination: Pagination
}
