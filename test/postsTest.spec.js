const request = require('supertest');
const expect = require('chai').expect;
const _ = require('lodash');
const config = require('../config');

_.times(config.ITERATION, () => {
  describe('API-posts', () => {

    let userId;
    
    it('GET-posts-list', () => {
      return request(config.BASE_URL)
        .get('/posts')
        .set('Authorization', `Bearer ${config.ACCESS_TOKEN}`)
        .expect(200)
        .then(res => {
          expect(res.body.length).eq(10);
          expect(res.body[0].id).to.be.a('number');
          expect(res.body[0].user_id).to.be.a('number');
          expect(res.body[0].title).to.be.a('string');
          expect(res.body[0].body).to.be.a('string');
        })      
    })
  })
})