"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _middlewares = _interopRequireDefault(require("../../middlewares"));

var _medusaCoreUtils = require("medusa-core-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var route = (0, _express.Router)();

var _default = function _default(app, rootDirectory) {
  var _getConfigFile = (0, _medusaCoreUtils.getConfigFile)(rootDirectory, "medusa-config"),
      configModule = _getConfigFile.configModule;

  var config = configModule && configModule.projectConfig || {};
  var storeCors = config.store_cors || "";
  route.use((0, _cors["default"])({
    origin: storeCors.split(","),
    credentials: true
  }));
  app.use("/store", route);
  route.post("/carts/:id/line-items/add-on", _bodyParser["default"].json(), _middlewares["default"].wrap(require("./create-line-item")["default"]));
  route.post("/carts/:id/line-items/:line_id/add-on", _bodyParser["default"].json(), _middlewares["default"].wrap(require("./update-line-item")["default"]));
  return app;
};

exports["default"] = _default;