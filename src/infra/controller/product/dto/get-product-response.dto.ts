import { ApiProperty } from '@nestjs/swagger'

export class GetProductResponseDto {
	@ApiProperty({ type: String, example: '12313123901' })
	id: string
	@ApiProperty({ type: String, example: '12313123901' })
	code: string
	@ApiProperty({ type: String, example: 'draft' })
	status: string
	@ApiProperty({ type: String, example: '2023-01-01T00:00:00.000Z' })
	imported_t: string
	@ApiProperty({ type: String, example: 'https://example.com' })
	url: string
	@ApiProperty({ type: String, example: 'John Doe' })
	creator: string
	@ApiProperty({ type: Number, example: 1677721600 })
	created_t: number
	@ApiProperty({ type: Number, example: 1677721600 })
	last_modified_t: number
	@ApiProperty({ type: String, example: 'Nutri-Score' })
	product_name: string
	@ApiProperty({ type: String, example: '100g' })
	quantity: string
	@ApiProperty({ type: String, example: 'Coca-Cola' })
	brands: string
	@ApiProperty({ type: String, example: 'Alcohol, Carbonated Beverages' })
	categories: string
	@ApiProperty({ type: String, example: 'Alcohol, Carbonated Beverages' })
	labels: string
	@ApiProperty({ type: String, example: 'New York' })
	cities: string
	@ApiProperty({ type: String, example: 'New York' })
	purchase_places: string
	@ApiProperty({ type: String, example: 'New York' })
	stores: string
	@ApiProperty({ type: String, example: 'Ingredients' })
	ingredients_text: string
	@ApiProperty({ type: String, example: 'Serving size' })
	traces: string
	@ApiProperty({ type: String, example: '100g' })
	serving_size: string
	@ApiProperty({ type: Number, example: 100 })
	serving_quantity: number
	@ApiProperty({ type: Number, example: 100 })
	nutriscore_score: number
	@ApiProperty({ type: String, example: 'A' })
	nutriscore_grade: string
	@ApiProperty({ type: String, example: 'Alcohol, Carbonated Beverages' })
	main_category: string
	@ApiProperty({ type: String, example: 'https://example.com/image.jpg' })
	image_url: string
}
