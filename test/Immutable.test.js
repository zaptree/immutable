'use strict';

const expect = require('chai').expect;

const Immutable = require('../src/Immutable');

describe('Immutable', () => {

  describe('modify', () => {
    let data;
    beforeEach(() => {
      data = new Immutable({
        posts: [
          {
            comments: [
              {
                author: 'John'
              },
              {
                author: 'Maria'
              },
              {
                author: 'Nick'
              },
            ]
          }
        ]
      });
    });
    afterEach(() => {

    });

    describe('set', () => {
      it('should return a new Immutable object with value set', () => {
        const newData = data.set('posts[0].comments[1].author', 'Janice');
        expect(data.get('posts[0].comments').length).to.equal(3);
        expect(newData.get('posts[0].comments').length).to.equal(3);
        expect(newData.get('posts[0].comments[1].author')).to.equal('Janice');
        // make sure that we are not getting a full clone
        const newDataFirstComment = newData.get('posts[0].comments[0]').toJS();
        const dataFirstComment = data.get('posts[0].comments[0]').toJS();
        const body = 'body';
        dataFirstComment.body = body;
        expect(newDataFirstComment.body).to.equal(body);
        expect(dataFirstComment.body).to.equal(body);
      });
    });

    describe('push', () => {
      it('should return a new Immutable object with value pushed', () => {
        const newTeacher = {
          author: 'Helen'
        };
        const newData = data.push('posts[0].comments', newTeacher);
        expect(data.get('posts[0].comments').length).to.equal(3);
        expect(newData.get('posts[0].comments').length).to.equal(4);
        expect(newData.get('posts[0].comments[3].author')).to.equal('Helen');
      });
    });

    describe('unshift', () => {
      it('should return a new Immutable object with value unshifted', () => {
        const newTeacher = {
          author: 'Helen'
        };
        const newData = data.unshift('posts[0].comments', newTeacher);
        expect(data.get('posts[0].comments').length).to.equal(3);
        expect(newData.get('posts[0].comments').length).to.equal(4);
        expect(newData.get('posts[0].comments[0].author')).to.equal('Helen');
      });
    });

    describe('shift', () => {
      it('should return a new Immutable object with value shifted', () => {
        const newData = data.shift('posts[0].comments');
        expect(data.get('posts[0].comments').length).to.equal(3);
        expect(newData.get('posts[0].comments').length).to.equal(2);
        expect(newData.get('posts[0].comments[0].author')).to.equal('Maria');
      });
    });

    describe('insert', () => {
      it('should return a new Immutable object with value inserted', () => {
        const newTeacher = {
          author: 'Helen'
        };
        const newData = data.insert('posts[0].comments', newTeacher, 1);
        expect(data.get('posts[0].comments').length).to.equal(3);
        expect(newData.get('posts[0].comments').length).to.equal(4);
        expect(newData.get('posts[0].comments[1].author')).to.equal('Helen');
      });
    });

    describe('remove', () => {
      it('should return a new Immutable object with value removed', () => {
        const newData = data.remove('posts[0].comments', 1);
        expect(data.get('posts[0].comments').length).to.equal(3);
        expect(newData.get('posts[0].comments').length).to.equal(2);
        expect(newData.get('posts[0].comments[1].author')).to.equal('Nick');
      });
    });

    describe('pop', () => {
      it('should return a new Immutable object with value popped', () => {
        const newData = data.pop('posts[0].comments');
        expect(data.get('posts[0].comments').length).to.equal(3);
        expect(newData.get('posts[0].comments').length).to.equal(2);
        expect(newData.get('posts[0].comments[1].author')).to.equal('Maria');
      });
    });

  })

});