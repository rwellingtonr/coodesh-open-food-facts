import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString } from 'class-validator'

export class GetCodeDto {
	@IsNumberString({ no_symbols: true }, { message: 'Code must be a number string' })
	@ApiProperty({ type: String, example: '12313123901' })
	code: string
}
