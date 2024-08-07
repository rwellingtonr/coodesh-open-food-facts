import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, Max, Min } from 'class-validator'

export class GetAllProductsDto {
	@Min(1)
	@Type(() => Number)
	@IsInt({ message: 'Page must be an integer' })
	@ApiProperty({ type: Number, example: 1, description: 'Page of products', minimum: 1 })
	page: number

	@IsInt({ message: 'Limit must be an integer' })
	@Min(5)
	@Max(50)
	@Type(() => Number)
	@ApiProperty({
		type: Number,
		example: 10,
		description: 'Limit of products',
		minimum: 5,
		maximum: 50,
	})
	limit: number
}
