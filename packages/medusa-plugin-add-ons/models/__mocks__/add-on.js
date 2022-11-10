"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddOnModelMock = exports.addOns = void 0;

var _medusaTestUtils = require("medusa-test-utils");

var addOns = {
  testAddOn: {
    _id: _medusaTestUtils.IdMap.getId("test-add-on"),
    name: "Chili",
    prices: [{
      currency_code: "DKK",
      amount: 20
    }],
    valid_for: [_medusaTestUtils.IdMap.getId("test-product")]
  },
  testAddOn2: {
    _id: _medusaTestUtils.IdMap.getId("test-add-on-2"),
    name: "Chili",
    prices: [{
      currency_code: "DKK",
      amount: 20
    }],
    valid_for: [_medusaTestUtils.IdMap.getId("test-product")]
  }
};
exports.addOns = addOns;
var AddOnModelMock = {
  create: jest.fn().mockReturnValue(Promise.resolve()),
  find: jest.fn().mockImplementation(function (query) {
    return Promise.resolve([addOns.testAddOn, addOns.testAddOn2]);
  }),
  updateOne: jest.fn().mockImplementation(function (query, update) {
    return Promise.resolve();
  }),
  deleteOne: jest.fn().mockReturnValue(Promise.resolve()),
  findOne: jest.fn().mockImplementation(function (query) {
    if (query._id === _medusaTestUtils.IdMap.getId("test-add-on")) {
      return Promise.resolve(addOns.testAddOn);
    }

    if (query._id === _medusaTestUtils.IdMap.getId("test-add-on-2")) {
      return Promise.resolve(addOns.testAddOn2);
    }

    return Promise.resolve(undefined);
  })
};
exports.AddOnModelMock = AddOnModelMock;