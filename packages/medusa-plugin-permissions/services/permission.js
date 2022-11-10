"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _medusaInterfaces = require("medusa-interfaces");

var _medusaCoreUtils = require("medusa-core-utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PermissionService = /*#__PURE__*/function (_BaseService) {
  _inherits(PermissionService, _BaseService);

  var _super = _createSuper(PermissionService);

  function PermissionService(_ref) {
    var _this;

    var userService = _ref.userService,
        roleModel = _ref.roleModel;

    _classCallCheck(this, PermissionService);

    _this = _super.call(this);
    /** @private @const {UserService} */

    _this.userService_ = userService;
    /** @private @const {RoleModel} */

    _this.roleModel_ = roleModel;
    return _this;
  }

  _createClass(PermissionService, [{
    key: "validatePermission_",
    value: function validatePermission_(permission) {
      var schema = _medusaCoreUtils.Validator.object({
        method: _medusaCoreUtils.Validator.string().valid("POST", "GET", "PUT", "PATCH", "DELETE", "CONNECT", "OPTIONS", "HEAD", "TRACE"),
        endpoint: _medusaCoreUtils.Validator.string()
      });

      var _schema$validate = schema.validate(permission),
          value = _schema$validate.value,
          error = _schema$validate.error;

      if (error) {
        throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.INVALID_ARGUMENT, "Permission is not valid");
      }

      return value;
    }
  }, {
    key: "retrieveRole",
    value: function () {
      var _retrieveRole = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name) {
        var role;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.roleModel_.findOne({
                  name: name
                })["catch"](function (err) {
                  throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.DB_ERROR, err.message);
                });

              case 2:
                role = _context.sent;

                if (role) {
                  _context.next = 5;
                  break;
                }

                throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.NOT_FOUND, "".concat(name, " does not exist. Use method createRole to create it."));

              case 5:
                return _context.abrupt("return", role);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function retrieveRole(_x) {
        return _retrieveRole.apply(this, arguments);
      }

      return retrieveRole;
    }()
  }, {
    key: "hasPermission",
    value: function () {
      var _hasPermission = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user, method, endpoint) {
        var i, role, permissions;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (user) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", false);

              case 2:
                i = 0;

              case 3:
                if (!(i < user.metadata.roles.length)) {
                  _context2.next = 12;
                  break;
                }

                role = user.metadata.roles[i];
                _context2.next = 7;
                return this.retrieveRole(role);

              case 7:
                permissions = _context2.sent;
                return _context2.abrupt("return", permissions.permissions.some(function (action) {
                  return action.method === method && action.endpoint === endpoint;
                }));

              case 9:
                i++;
                _context2.next = 3;
                break;

              case 12:
                return _context2.abrupt("return", false);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function hasPermission(_x2, _x3, _x4) {
        return _hasPermission.apply(this, arguments);
      }

      return hasPermission;
    }()
  }, {
    key: "createRole",
    value: function () {
      var _createRole = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(roleName, permissions) {
        var _this2 = this;

        var validatedPermissions;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                validatedPermissions = permissions.map(function (permission) {
                  return _this2.validatePermission_(permission);
                });
                return _context3.abrupt("return", this.retrieveRole(roleName).then(function (role) {
                  throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.INVALID_ARGUMENT, "".concat(role.name, " already exists"));
                })["catch"](function (error) {
                  if (error.name === _medusaCoreUtils.MedusaError.Types.NOT_FOUND) {
                    return _this2.roleModel_.create({
                      name: roleName,
                      permissions: validatedPermissions
                    });
                  } else {
                    throw error;
                  }
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createRole(_x5, _x6) {
        return _createRole.apply(this, arguments);
      }

      return createRole;
    }()
  }, {
    key: "deleteRole",
    value: function () {
      var _deleteRole = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(roleName) {
        var role;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.retrieve(roleName);

              case 2:
                role = _context4.sent;

                if (role) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", Promise.resolve());

              case 5:
                return _context4.abrupt("return", this.roleModel_.deleteOne({
                  _id: role._id
                })["catch"](function (err) {
                  throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.DB_ERROR, err.message);
                }));

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deleteRole(_x7) {
        return _deleteRole.apply(this, arguments);
      }

      return deleteRole;
    }()
  }, {
    key: "addPermission",
    value: function () {
      var _addPermission = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(roleName, permission) {
        var role, validatedPermission;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.retrieveRole(roleName);

              case 2:
                role = _context5.sent;
                validatedPermission = this.validatePermission_(permission);
                return _context5.abrupt("return", this.roleModel_.updateOne({
                  _id: role._id
                }, {
                  $push: {
                    permissions: validatedPermission
                  }
                }));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addPermission(_x8, _x9) {
        return _addPermission.apply(this, arguments);
      }

      return addPermission;
    }()
  }, {
    key: "removePermission",
    value: function () {
      var _removePermission = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(roleName, permission) {
        var role, validatedPermission;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.retrieveRole(roleName);

              case 2:
                role = _context6.sent;
                validatedPermission = this.validatePermission_(permission);
                return _context6.abrupt("return", this.roleModel_.updateOne({
                  _id: role._id
                }, {
                  $pull: {
                    permissions: validatedPermission
                  }
                }));

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function removePermission(_x10, _x11) {
        return _removePermission.apply(this, arguments);
      }

      return removePermission;
    }()
  }, {
    key: "grantRole",
    value: function () {
      var _grantRole = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(userId, roleName) {
        var role, user;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.retrieveRole(roleName);

              case 2:
                role = _context7.sent;
                _context7.next = 5;
                return this.userService_.retrieve(userId);

              case 5:
                user = _context7.sent;

                if (user.metadata.roles) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", this.userService_.setMetadata(userId, "roles", [roleName]));

              case 8:
                if (!user.metadata.roles.includes(role.name)) {
                  _context7.next = 10;
                  break;
                }

                throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.DB_ERROR, "User already has role: ".concat(role.name));

              case 10:
                user.metadata.roles.push(roleName);
                return _context7.abrupt("return", this.userService_.setMetadata(userId, "roles", user.metadata.roles));

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function grantRole(_x12, _x13) {
        return _grantRole.apply(this, arguments);
      }

      return grantRole;
    }()
  }, {
    key: "revokeRole",
    value: function () {
      var _revokeRole = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(userId, roleName) {
        var user, newRoles;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.userService_.retrieve(userId);

              case 2:
                user = _context8.sent;

                if (!(!user.metadata.roles || !user.metadata.roles.includes(roleName))) {
                  _context8.next = 5;
                  break;
                }

                return _context8.abrupt("return", Promise.resolve());

              case 5:
                // remove role from metadata.roles
                newRoles = user.metadata.roles.filter(function (r) {
                  return r !== roleName;
                });
                return _context8.abrupt("return", this.userService_.setMetadata(userId, "roles", newRoles));

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function revokeRole(_x14, _x15) {
        return _revokeRole.apply(this, arguments);
      }

      return revokeRole;
    }()
  }]);

  return PermissionService;
}(_medusaInterfaces.BaseService);

var _default = PermissionService;
exports["default"] = _default;