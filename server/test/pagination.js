var should = require('should');
var pagination = require('../utils/pagination');

describe('Pagination', function() {

  it('should return defaults if nothing specified', function () {
    pagination({query: {}}).should.eql({skip: 0, limit: 10});
  });

  it('should return defaults for zero', function () {
    pagination({query: {limit: '0'}}).should.eql({skip: 0, limit: 10});
    pagination({query: {skip: '0'}}).should.eql({skip: 0, limit: 10});
    pagination({query: {skip: '0', limit: '0'}}).should.eql({skip: 0, limit: 10});
  });

  it('should return defaults for malformed parameters', function () {
    pagination({query: {skip: 'dog', limit: 'cat'}}).should.eql({skip: 0, limit: 10});
    pagination({query: {skip: '--8', limit: '&*%&'}}).should.eql({skip: 0, limit: 10});
    pagination({query: {skip: '7.q2', limit: '000k'}}).should.eql({skip: 0, limit: 10});
  });

  it('should handle good values in range', function () {
    pagination({query: {skip: '5', limit: '8'}}).should.eql({skip: 5, limit: 8});
    pagination({query: {skip: '15', limit: '5'}}).should.eql({skip: 15, limit: 5});
    pagination({query: {limit: '1'}}).should.eql({skip: 0, limit: 1});
    pagination({query: {limit: '100'}}).should.eql({skip: 0, limit: 100});
  });

  it('should truncate limits that are too small', function () {
    pagination({query: {limit: '-1'}}).should.eql({skip: 0, limit: 1});
    pagination({query: {limit: '-7000'}}).should.eql({skip: 0, limit: 1});
  });

  it('should truncate limits that are too big', function () {
    pagination({query: {limit: '101'}}).should.eql({skip: 0, limit: 100});
    pagination({query: {limit: '7000'}}).should.eql({skip: 0, limit: 100});
  });
});
