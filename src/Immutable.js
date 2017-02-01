'use strict';
const get = require('lodash/get');
const fpSet = require('lodash/fp/set');

class Immutable {
  constructor(data) {
    this.getData = () => {
      return data;
    }
  }

  prop(prop) {
    const data = this.getData();
    return new Immutable(data[prop]);
  }

  get(path) {
    const data = this.getData();
    const value = get(data, path);
    if (value !== null && (value.constructor === Array || typeof value === 'object')) {
      return new Immutable(value);
    }
    return value;
  }

  value() {
    return this.getData();
  }

  get length() {
    return this.getData().length;
  }

  set(path, value) {
    const data = this.getData();
    return new Immutable(fpSet(path, value, data));
  }

  toJS() {
    return this.getData();
  }

  push(path, value) {
    const data = this.getData();
    const originalArray = get(data, path);
    const newArray = [
      ...originalArray,
      value
    ];
    return new Immutable(fpSet(path, newArray, data));
  }

  unshift(path, value) {
    return this.insert(path, value, 0);
  }

  shift(path) {
    return this.remove(path, 0);
  }

  insert(path, value, index = 0) {
    const data = this.getData();
    const originalArray = get(data, path);
    const newArray = [
      ...originalArray.slice(0, index),
      value,
      ...originalArray.slice(index)
    ];
    return new Immutable(fpSet(path, newArray, data));
  }

  remove(path, index) {
    const data = this.getData();
    const originalArray = get(data, path);
    const newArray = [
      ...originalArray.slice(0, index),
      ...originalArray.slice(index + 1)
    ];
    return new Immutable(fpSet(path, newArray, data));
  }

  pop(path) {
    const data = this.getData();
    const originalArray = get(data, path);
    const newArray = originalArray.slice(0, originalArray.length - 1);
    return new Immutable(fpSet(path, newArray, data));
  }

}

module.exports = Immutable;
