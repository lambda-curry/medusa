"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ProductVariantServiceMock = exports.variants = void 0;

var _medusaTestUtils = require("medusa-test-utils");

var variant1 = {
  _id: _medusaTestUtils.IdMap.getId("test-variant-1"),
  title: "variant1",
  options: []
};
var variant2 = {
  _id: _medusaTestUtils.IdMap.getId("test-variant-2"),
  title: "variant2",
  options: [{
    option_id: _medusaTestUtils.IdMap.getId("color_id"),
    value: "black"
  }, {
    option_id: _medusaTestUtils.IdMap.getId("size_id"),
    value: "160"
  }]
};
var variant3 = {
  _id: _medusaTestUtils.IdMap.getId("test-variant-3"),
  title: "variant3",
  options: [{
    option_id: _medusaTestUtils.IdMap.getId("color_id"),
    value: "blue"
  }, {
    option_id: _medusaTestUtils.IdMap.getId("size_id"),
    value: "150"
  }]
};
var variant4 = {
  _id: _medusaTestUtils.IdMap.getId("test-variant-4"),
  title: "variant4",
  options: [{
    option_id: _medusaTestUtils.IdMap.getId("color_id"),
    value: "blue"
  }, {
    option_id: _medusaTestUtils.IdMap.getId("size_id"),
    value: "50"
  }]
};
var variants = {
  one: variant1,
  two: variant2,
  three: variant3,
  four: variant4
};
exports.variants = variants;
var ProductVariantServiceMock = {
  retrieve: jest.fn().mockImplementation(function (variantId) {
    if (variantId === _medusaTestUtils.IdMap.getId("test-variant-1")) {
      return Promise.resolve(variant1);
    }

    if (variantId === _medusaTestUtils.IdMap.getId("test-variant-2")) {
      return Promise.resolve(variant2);
    }

    if (variantId === _medusaTestUtils.IdMap.getId("test-variant-3")) {
      return Promise.resolve(variant3);
    }

    if (variantId === _medusaTestUtils.IdMap.getId("test-variant-4")) {
      return Promise.resolve(variant4);
    }

    return Promise.resolve(undefined);
  }),
  getRegionPrice: jest.fn().mockImplementation(function (variantId, regionId) {
    if (variantId === _medusaTestUtils.IdMap.getId("test-variant-1")) {
      if (regionId === _medusaTestUtils.IdMap.getId("world")) {
        return Promise.resolve(10);
      } else {
        return Promise.resolve(20);
      }
    }

    return Promise.reject(new Error("Not found"));
  })
};
exports.ProductVariantServiceMock = ProductVariantServiceMock;
var mock = jest.fn().mockImplementation(function () {
  return ProductVariantServiceMock;
});
var _default = mock;
exports["default"] = _default;