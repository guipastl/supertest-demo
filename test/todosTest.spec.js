const request = require('supertest');
const expect = require('chai').expect;
const config = require('../config')

describe('API-todos', () => {

  let userId;
  
  it('GET-todos-list', () => {
    return request(config.BASE_URL)
      .get('/todos')
      .set('Authorization', `Bearer ${config.ACCESS_TOKEN}`)
      .expect(200)
      .then(res => {
        expect(res.body.length).eq(10);
        expect(res.body[0].id).to.be.a('number');
        expect(res.body[0].user_id).to.be.a('number');
        expect(res.body[0].title).to.be.a('string');
        expect(res.body[0].due_on).to.include('T00:00:00.000+05:30');
        expect(res.body[0].status).to.be.a('string');
      })      
  })
})