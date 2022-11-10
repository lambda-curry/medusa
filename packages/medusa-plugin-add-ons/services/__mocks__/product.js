"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ProductServiceMock = exports.products = void 0;

var _medusaTestUtils = require("medusa-test-utils");

var products = {
  product1: {
    _id: _medusaTestUtils.IdMap.getId("test-product"),
    description: "Test description",
    title: "Product 1",
    variants: [_medusaTestUtils.IdMap.getId("test-variant-1")] // metadata: {
    //   add_ons: [IdMap.getId("test-add-on"), IdMap.getId("test-add-on-2")],
    // },

  },
  product2: {
    _id: _medusaTestUtils.IdMap.getId("test-product-2"),
    title: "Product 2",
    metadata: {}
  }
};
exports.products = products;
var ProductServiceMock = {
  retrieve: jest.fn().mockImplementation(function (productId) {
    if (productId === _medusaTestUtils.IdMap.getId("test-product")) {
      return Promise.resolve(products.product1);
    }

    if (productId === _medusaTestUtils.IdMap.getId("test-product-2")) {
      return Promise.resolve(products.product2);
    }

    return Promise.resolve(undefined);
  }),
  list: jest.fn().mockImplementation(function (query) {
    return Promise.resolve([products.product1]);
  })
};
exports.ProductServiceMock = ProductServiceMock;
var mock = jest.fn().mockImplementation(function () {
  return ProductServiceMock;
});
var _default = mock;
exports["default"] = _default;