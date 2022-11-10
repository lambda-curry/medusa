"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RegionServiceMock = exports.regions = void 0;

var _medusaTestUtils = require("medusa-test-utils");

var regions = {
  testRegion: {
    _id: _medusaTestUtils.IdMap.getId("world"),
    name: "Test Region",
    countries: ["DK", "US", "DE"],
    tax_rate: 0.25,
    payment_providers: ["default_provider", "unregistered"],
    fulfillment_providers: ["test_shipper"],
    currency_code: "DKK"
  }
};
exports.regions = regions;
var RegionServiceMock = {
  retrieve: jest.fn().mockImplementation(function (regionId) {
    if (regionId === _medusaTestUtils.IdMap.getId("world")) {
      return Promise.resolve(regions.testRegion);
    }

    throw Error(regionId + "not found");
  })
};
exports.RegionServiceMock = RegionServiceMock;
var mock = jest.fn().mockImplementation(function () {
  return RegionServiceMock;
});
var _default = mock;
exports["default"] = _default;