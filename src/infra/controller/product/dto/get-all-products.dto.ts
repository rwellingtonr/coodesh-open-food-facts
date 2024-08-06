import { ApiProperty } from '@nestjs/swagger'
import { IsInt, Max, Min } from 'class-validator'

export class GetAllProductsDto {
	@Min(1)
	@IsInt({ message: 'Page must be an integer' })
	@ApiProperty({ type: Number, example: 1, description: 'Page of products' })
	page: number

	@IsInt({ message: 'Limit must be an integer' })
	@Min(5)
	@Max(50)
	@ApiProperty({ type: Number, example: 10, description: 'Limit of products' })
	limit: number
}
