import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsIn, IsInt, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator'

export class UpdateProductDto {
	@ApiPropertyOptional({ type: String, example: 'draft', enum: ['draft', 'published'] })
	@IsIn(['draft', 'published'])
	@IsOptional()
	status: string

	@ApiPropertyOptional({ type: String, example: 'https://example.com' })
	@IsUrl()
	@IsOptional()
	url: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: 'John Doe' })
	creator: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: 'Nutri-Score' })
	product_name: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: '100g' })
	quantity: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: 'Coca-Cola' })
	brands: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: 'Alcohol, Carbonated Beverages' })
	categories: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: 'Alcohol, Carbonated Beverages' })
	labels: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: 'New York' })
	cities: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: 'New York' })
	purchase_places: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: 'New York' })
	stores: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: 'Ingredients' })
	ingredients_text: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: 'Serving size' })
	traces: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: '100g' })
	serving_size: string

	@IsNumber()
	@IsOptional()
	@ApiPropertyOptional({ type: Number, example: 100 })
	serving_quantity: number

	@IsInt()
	@IsOptional()
	@ApiPropertyOptional({ type: Number, example: 100 })
	nutriscore_score: number

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: 'A' })
	nutriscore_grade: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: 'Alcohol, Carbonated Beverages' })
	main_category: string

	@IsUrl()
	@IsOptional()
	@ApiPropertyOptional({ type: String, example: 'https://example.com/image.jpg' })
	image_url: string
}
