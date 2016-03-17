import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const { assert, expect } = chai;

chai.should();
chai.use(sinonChai);

export {
  React,
  ReactDOM,
  TestUtils,
  chai,
  sinon,
  sinonChai,
  assert,
  expect
}
