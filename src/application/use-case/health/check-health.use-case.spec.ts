import { faker } from '@faker-js/faker'
import { ErrorProcessingInMemory } from '@test/in-memory-repository/error-processing.in-memory'
import { MemoryUsageInMemory } from '@test/in-memory-repository/memory-usage.in-memory'
import { ProcessingStatusInMemory } from '@test/in-memory-repository/processing-status.in-memory'

import { CheckHealthUseCase } from './check-health.use-case'

describe('CheckHealthUseCase', () => {
	let sut: CheckHealthUseCase
	let processingStatusRepository: ProcessingStatusInMemory
	let memoryUsageRepository: MemoryUsageInMemory
	let errorsProcessingRepository: ErrorProcessingInMemory

	beforeEach(() => {
		processingStatusRepository = new ProcessingStatusInMemory()
		memoryUsageRepository = new MemoryUsageInMemory()
		errorsProcessingRepository = new ErrorProcessingInMemory()

		sut = new CheckHealthUseCase(
			processingStatusRepository,
			memoryUsageRepository,
			errorsProcessingRepository,
		)
	})

	// execute method returns database_status as 'OK' when no errors occur
	it('should return database_status as "OK" when no errors occur', async () => {
		const filename = `${faker.string.alphanumeric()}.json`
		const processing = await processingStatusRepository.create({
			filename,
			starting_processing_at: new Date().toISOString(),
			processed_at: new Date().toISOString(),
			status: 'processed',
		})
		await memoryUsageRepository.create({
			processing_status_id: processing.id,
			rss: '1024',
			heapTotal: '2048',
			heapUsed: '1024',
			external: '512',
		})

		const result = await sut.execute()

		expect(result.database_status).toBe('OK')
		expect(result.files).toHaveLength(1)
		expect(result.files[0].filename).toBe(filename)
	})

	// execute method returns database_status as 'NOK' when an error occurs
	it('should return database_status as "NOK" when an error occurs', async () => {
		const processingStatusRepository = {
			getLastFilesProcessed: vi.fn().mockResolvedValue(new Error()),
		} as any
		const memoryUsageRepository = {
			findMemoryUsageInProcess: vi.fn(),
		} as any
		const errorsProcessingRepository = {
			findManyErrosInProcess: vi.fn(),
		} as any

		sut = new CheckHealthUseCase(
			processingStatusRepository,
			memoryUsageRepository,
			errorsProcessingRepository,
		)

		const result = await sut.execute()

		expect(result.database_status).toBe('NOK')
		expect(result.files).toHaveLength(0)
	})
})
