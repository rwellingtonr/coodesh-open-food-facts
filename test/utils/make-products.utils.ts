import { faker } from '@faker-js/faker'

export const makeProducts = () => {
	return {
		url: faker.internet.url(),
		creator: faker.person.fullName(),
		created_t: Date.now(),
		last_modified_t: Date.now(),
		status: 'draft',
		brands: faker.lorem.word(),
		categories: faker.lorem.word(),
		labels: faker.lorem.slug(),
		cities: faker.location.city(),
		purchase_places: faker.location.streetAddress(),
		stores: faker.lorem.word(),
		ingredients_text: faker.lorem.sentence(),
		traces: faker.lorem.slug(),
		serving_size: faker.lorem.slug(),
		serving_quantity: faker.number.int(),
		nutriscore_score: faker.number.int(),
		nutriscore_grade: faker.string.numeric(),
		main_category: faker.lorem.word(),
		image_url: faker.internet.url(),
		imported_t: new Date().toISOString(),
		product_name: faker.lorem.slug(),
		quantity: faker.string.numeric(),
		code: faker.string.numeric(),
	}
}
