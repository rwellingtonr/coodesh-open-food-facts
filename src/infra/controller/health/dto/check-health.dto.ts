import { ApiProperty } from '@nestjs/swagger'

class ErrorProcessing {
	@ApiProperty({ type: String, example: 'P200' })
	code: string
	@ApiProperty({ type: String, example: 'Error message' })
	message: string
	@ApiProperty({ type: Number, example: 167772160 })
	created_t: number
}

class MemoryUsage {
	@ApiProperty({ type: String, example: '3.47 Mb' })
	rss: string
	@ApiProperty({ type: String, example: '0.47 Mb' })
	heapTotal: string
	@ApiProperty({ type: String, example: '7 Mb' })
	heapUsed: string
	@ApiProperty({ type: String, example: '2 Mb' })
	external: string
}

class File {
	@ApiProperty({ type: String, example: '123123' })
	id: string
	@ApiProperty({ type: String, example: 'filename.json' })
	filename: string
	@ApiProperty({ type: Number, example: 300, description: 'milliseconds' })
	processing_time: number
	@ApiProperty({ type: String, example: 'processed' })
	status: string
	@ApiProperty({ type: MemoryUsage })
	memory_usage: MemoryUsage
	@ApiProperty({ type: [ErrorProcessing] })
	errors: ErrorProcessing[]
}

export class CheckHealthDto {
	@ApiProperty({ type: String, example: 'OK' })
	database_status: string
	@ApiProperty({ type: [File] })
	files: File[]
}
