const { faker } = require('@faker-js/faker');

module.exports = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
}