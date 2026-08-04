const request = require('supertest');
const expect = require('chai').expect;
const _ = require('lodash');
const randomData = require('../fixtures/randomData');
const config = require('../config');

_.times(config.ITERATION, () => {
  describe('API-users', () => {

  let userId;
  
  it('GET-users-list', () => {
    return request(config.BASE_URL)
      .get('/users')
      .set('Authorization', `Bearer ${config.ACCESS_TOKEN}`)
      .expect(200)
      .then(res => {
        expect(res.body.length).eq(10);
        expect(res.body[0].id).to.be.a('number');
        expect(res.body[0].name).to.be.a('string');
        expect(res.body[0].email).to.be.a('string');
        expect(res.body[0].gender).to.be.a('string');
        expect(res.body[0].status).to.be.a('string');
        userId = res.body[0].id
      })      
  })

  it('GET-users-by-id', () => {
    return request(config.BASE_URL)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${config.ACCESS_TOKEN}`)
      .expect(200)
      .then(res => {
        expect(res.body.id).to.be.a('number');
        expect(res.body.name).to.be.a('string');
        expect(res.body.email).to.be.a('string');
        expect(res.body.gender).to.be.a('string');
        expect(res.body.status).to.be.a('string');
      })      
  })

  it('GET-users-invalid-id', () => {
    return request(config.BASE_URL)
      .get('/users/abc123')
      .set('Authorization', `Bearer ${config.ACCESS_TOKEN}`)
      .expect(404)
      .then(res => {
        expect(res.body.message).eq('Resource not found')
      })      
  })  

  it('POST-users', () => {
    return request(config.BASE_URL)
      .post('/users')
      .send({
        name: randomData.name,
        email: randomData.email,
        gender: 'male',
        status: 'active'
      })
      .set('Authorization', `Bearer ${config.ACCESS_TOKEN}`)
      .expect(201)
      .then(res => {
        expect(res.body.id).to.be.a('number');
        expect(res.body.name).eq(randomData.name);
        expect(res.body.email).eq(randomData.email);
        expect(res.body.gender).eq('male');
        expect(res.body.status).eq('active');
        userId = res.body.id
      })      
  })  

  it('POST-users-blank-name', () => {
    return request(config.BASE_URL)
      .post('/users')
      .send({
        email: randomData.email,
        gender: 'male',
        status: 'active'
      })
      .set('Authorization', `Bearer ${config.ACCESS_TOKEN}`)
      .expect(422)
      .then(res => {
        expect(res.body[0].field).eq('name');
        expect(res.body[0].message).eq("can't be blank");
      })      
  })  

  it('POST-users-blank-email', () => {
    return request(config.BASE_URL)
      .post('/users')
      .send({
        name: randomData.name,
        gender: 'male',
        status: 'active'
      })
      .set('Authorization', `Bearer ${config.ACCESS_TOKEN}`)
      .expect(422)
      .then(res => {
        expect(res.body[0].field).eq('email');
        expect(res.body[0].message).eq("can't be blank");
      })      
  })  

  it('PUT-users', () => {
    return request(config.BASE_URL)
      .put(`/users/${userId}`)
      .send({
        name: randomData.name,
        email: randomData.email,
        gender: 'female',
        status: 'inactive'
      })
      .set('Authorization', `Bearer ${config.ACCESS_TOKEN}`)
      .expect(200)
      .then(res => {
        expect(res.body.id).eq(userId);
        expect(res.body.gender).eq('female');
        expect(res.body.status).eq('inactive');
      })      
  })  

  it('PATCH-users', () => {
    return request(config.BASE_URL)
      .patch(`/users/${userId}`)
      .send({
        gender: 'male',
        status: 'active'
      })
      .set('Authorization', `Bearer ${config.ACCESS_TOKEN}`)
      .expect(200)
      .then(res => {
        expect(res.body.id).eq(userId);
        expect(res.body.gender).eq('male');
        expect(res.body.status).eq('active');
      })      
  })  

  it('DELETE-users', () => {
    return request(config.BASE_URL)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${config.ACCESS_TOKEN}`)
      .expect(204)
      .then(res => {
        expect(res.body).to.be.empty;
      })      
  })  
  })
})