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
  var adminCors = config.admin_cors || "";
  route.use((0, _cors["default"])({
    origin: adminCors.split(","),
    credentials: true
  }));
  app.use("/admin", route);
  route.post("/add-ons", _bodyParser["default"].json(), _middlewares["default"].wrap(require("./create-add-on")["default"]));
  route.post("/add-ons/:id", _bodyParser["default"].json(), _middlewares["default"].wrap(require("./update-add-on")["default"]));
  route.get("/add-ons", _bodyParser["default"].json(), _middlewares["default"].wrap(require("./list-add-ons")["default"]));
  route.get("/add-ons/:id", _bodyParser["default"].json(), _middlewares["default"].wrap(require("./get-add-on")["default"]));
  route["delete"]("/add-ons/:id", _bodyParser["default"].json(), _middlewares["default"].wrap(require("./delete-add-on")["default"]));
  return app;
};

exports["default"] = _default;