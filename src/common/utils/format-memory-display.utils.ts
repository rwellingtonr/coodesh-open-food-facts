export const formatMemoryDisplay = (bytes: string) => {
	const memoryInBytes = parseInt(bytes, 10)
	const memoryInGigaBytes = memoryInBytes / 1024 / 1024

	return `${memoryInGigaBytes.toFixed(2)} Mb`
}
