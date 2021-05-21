const supertest = require('supertest')
const app = require('../server')
const request = supertest(app)


const isIncludeField = function (fieldName) {
	return function (res) {
		res.body.should.have.property(fieldName);
	};
}

describe('GET homepage', () => {
	it('expects OK status', () => {
		const res = request.get('/').expect(200);
	})
})

describe('POST /synonyms', () => {
	it('should return most similar words', () => {
		const res = request
		.post('/synonym')
		.send({text: "будинок"})
		.expect(isIncludeField('most_similar'))
	});
});

describe('POST /wordcalc', () => {
	it('should return calculated word', () => {
		const res = request
		.post('/wordcalc')
		.send({negative: "чоловік", positive: "король,жінка"})
		.expect(isIncludeField('result'))
	});
});

describe('POST /extraword', () => {
	it('should return extra word', () => {
		const res = request
		.post('/extraword')
		.send({text: "місто,село,столиця,країна"})
		.expect(isIncludeField('extra_word'))
	});
});

