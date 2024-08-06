import { ApiProperty } from '@nestjs/swagger'

export class PaginateDto {
	@ApiProperty({ type: Number, example: 100 })
	total: number
	@ApiProperty({ type: Number, example: 10 })
	totalPages: number
	@ApiProperty({ type: Number, example: 1 })
	page: number
	@ApiProperty({ type: Number, example: 10 })
	limit: number
}

export class PaginateResponseDto<TData> {
	items: TData[]
	@ApiProperty({ type: PaginateDto })
	pagination: PaginateDto
}
