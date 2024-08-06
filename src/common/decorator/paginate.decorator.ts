import { applyDecorators, type Type } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

import { PaginateResponseDto } from '../dto/paginate.dto'

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
	return applyDecorators(
		ApiExtraModels(PaginateResponseDto, model),
		ApiOkResponse({
			schema: {
				allOf: [
					{ $ref: getSchemaPath(PaginateResponseDto) },
					{
						properties: {
							results: {
								type: 'array',
								items: { $ref: getSchemaPath(model) },
							},
						},
					},
				],
			},
		}),
	)
}
