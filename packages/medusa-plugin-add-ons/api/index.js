"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _admin = _interopRequireDefault(require("./routes/admin"));

var _store = _interopRequireDefault(require("./routes/store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(rootDirectory) {
  var app = (0, _express.Router)();
  (0, _store["default"])(app, rootDirectory);
  (0, _admin["default"])(app, rootDirectory);
  return app;
};

exports["default"] = _default;