"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permissions = exports.RoleModelMock = void 0;

var _medusaTestUtils = require("medusa-test-utils");

var permissions = {
  productEditorPermission: {
    _id: _medusaTestUtils.IdMap.getId("product_editor"),
    name: "product_editor",
    permissions: [{
      method: "POST",
      endpoint: "/products"
    }, {
      method: "GET",
      endpoint: "/products"
    }, {
      method: "PUT",
      endpoint: "/products"
    }]
  }
};
exports.permissions = permissions;
var RoleModelMock = {
  create: jest.fn().mockReturnValue(Promise.resolve()),
  deleteOne: jest.fn().mockReturnValue(Promise.resolve()),
  findOne: jest.fn().mockImplementation(function (query) {
    if (query.name === "product_editor") {
      return Promise.resolve(permissions.productEditorPermission);
    }

    return Promise.resolve(undefined);
  }),
  updateOne: jest.fn().mockImplementation(function (query, update) {
    return Promise.resolve();
  })
};
exports.RoleModelMock = RoleModelMock;