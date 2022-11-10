"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.AddOnServiceMock = exports.addOns = void 0;

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
  },
  testAddOn3: {
    _id: _medusaTestUtils.IdMap.getId("test-add-on-3"),
    name: "Herbs",
    prices: [{
      currency_code: "DKK",
      amount: 20
    }],
    valid_for: []
  }
};
exports.addOns = addOns;
var AddOnServiceMock = {
  retrieve: jest.fn().mockImplementation(function (addOnId) {
    if (addOnId === _medusaTestUtils.IdMap.getId("test-add-on")) {
      return Promise.resolve(addOns.testAddOn);
    }

    if (addOnId === _medusaTestUtils.IdMap.getId("test-add-on-2")) {
      return Promise.resolve(addOns.testAddOn2);
    }

    if (addOnId === _medusaTestUtils.IdMap.getId("test-add-on-3")) {
      return Promise.resolve(addOns.testAddOn3);
    }

    return Promise.resolve(undefined);
  }),
  getRegionPrice: jest.fn().mockImplementation(function (addOnId, regionId) {
    if (addOnId === _medusaTestUtils.IdMap.getId("test-add-on")) {
      return Promise.resolve(20);
    }

    if (addOnId === _medusaTestUtils.IdMap.getId("test-add-on-2")) {
      return Promise.resolve(20);
    }

    if (addOnId === _medusaTestUtils.IdMap.getId("test-add-on-3")) {
      return Promise.resolve(20);
    }

    return Promise.resolve(undefined);
  })
};
exports.AddOnServiceMock = AddOnServiceMock;
var mock = jest.fn().mockImplementation(function () {
  return AddOnServiceMock;
});
var _default = mock;
exports["default"] = _default;