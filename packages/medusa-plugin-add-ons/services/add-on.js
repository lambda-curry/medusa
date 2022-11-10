"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _medusaInterfaces = require("medusa-interfaces");

var _medusaCoreUtils = require("medusa-core-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AddOnService = /*#__PURE__*/function (_BaseService) {
  _inherits(AddOnService, _BaseService);

  var _super = _createSuper(AddOnService);

  function AddOnService(_ref, options) {
    var _this;

    var addOnModel = _ref.addOnModel,
        productService = _ref.productService,
        productVariantService = _ref.productVariantService,
        regionService = _ref.regionService,
        eventBusService = _ref.eventBusService;

    _classCallCheck(this, AddOnService);

    _this = _super.call(this);
    _this.addOnModel_ = addOnModel;
    _this.productService_ = productService;
    _this.productVariantService_ = productVariantService;
    _this.regionService_ = regionService;
    _this.eventBus_ = eventBusService;
    _this.options_ = options;
    return _this;
  }
  /**
   * Used to validate add-on ids. Throws an error if the cast fails
   * @param {string} rawId - the raw add-on id to validate.
   * @return {string} the validated id
   */


  _createClass(AddOnService, [{
    key: "validateId_",
    value: function validateId_(rawId) {
      return rawId;
    }
    /**
     * @param {Object} selector - the query object for find
     * @return {Promise} the result of the find operation
     */

  }, {
    key: "list",
    value: function list(selector, offset, limit) {
      return this.addOnModel_.find(selector, {}, offset, limit);
    }
    /**
     * Gets an add-on by id.
     * @param {string} addOnId - the id of the add-on to get.
     * @return {Promise<AddOn>} the add-on document.
     */

  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(addOnId) {
        var validatedId, addOn;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                validatedId = this.validateId_(addOnId);
                _context.next = 3;
                return this.addOnModel_.findOne({
                  _id: validatedId
                })["catch"](function (err) {
                  throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.DB_ERROR, err.message);
                });

              case 3:
                addOn = _context.sent;

                if (addOn) {
                  _context.next = 6;
                  break;
                }

                throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.NOT_FOUND, "Add-on with ".concat(addOnId, " was not found"));

              case 6:
                return _context.abrupt("return", addOn);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function retrieve(_x) {
        return _retrieve.apply(this, arguments);
      }

      return retrieve;
    }()
    /**
     * Creates an add-on.
     * @param {object} addOn - the add-on to create
     * @return {Promise} resolves to the creation result.
     */

  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(addOn) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Promise.all(addOn.valid_for.map(function (prodId) {
                  _this2.productService_.retrieve(prodId);
                }));

              case 2:
                return _context2.abrupt("return", this.addOnModel_.create(addOn).then(function (result) {
                  _this2.eventBus_.emit(AddOnService.Events.CREATED, result);

                  return result;
                })["catch"](function (err) {
                  throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.DB_ERROR, err.message);
                }));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     * Deletes an add-on.
     * @param {object} addOnId - the add-on to delete
     * @return {Promise} resolves to the deletion result.
     */

  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(addOnId) {
        var addOn;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.retrieve(addOnId);

              case 2:
                addOn = _context3.sent;
                return _context3.abrupt("return", this.addOnModel_.deleteOne({
                  _id: addOn._id
                }));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _delete(_x3) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
    /**
     * Retrieves all valid add-ons for a given product.
     * @param {object} productId - the product id to find add-ons for
     * @return {Promise} returns a promise containing all add-ons for the product
     */

  }, {
    key: "retrieveByProduct",
    value: function () {
      var _retrieveByProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(productId) {
        var product;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.productService_.retrieve(productId);

              case 2:
                product = _context4.sent;
                return _context4.abrupt("return", this.addOnModel_.find({
                  valid_for: product._id
                }));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function retrieveByProduct(_x4) {
        return _retrieveByProduct.apply(this, arguments);
      }

      return retrieveByProduct;
    }()
    /**
     * Updates an add-on. Metadata updates should use dedicated methods, e.g.
     * `setMetadata`, etc. The function will throw errors if metadata updates
     * are attempted.
     * @param {string} addOnId - the id of the add-on. Must be a string that
     *   can be casted to an ObjectId
     * @param {object} update - an object with the update values.
     * @return {Promise} resolves to the update result.
     */

  }, {
    key: "update",
    value: function () {
      var _update2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(addOnId, _update) {
        var _this3 = this;

        var validatedId;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                validatedId = this.validateId_(addOnId);
                _context5.next = 3;
                return Promise.all(_update.valid_for.map(function (prodId) {
                  _this3.productService_.retrieve(prodId);
                }));

              case 3:
                if (!_update.metadata) {
                  _context5.next = 5;
                  break;
                }

                throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.INVALID_DATA, "Use setMetadata to update metadata fields");

              case 5:
                return _context5.abrupt("return", this.addOnModel_.updateOne({
                  _id: validatedId
                }, {
                  $set: _update
                }, {
                  runValidators: true
                })["catch"](function (err) {
                  throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.DB_ERROR, err.message);
                }));

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function update(_x5, _x6) {
        return _update2.apply(this, arguments);
      }

      return update;
    }()
    /**
     * Gets the price specific to a region. If no region specific money amount
     * exists the function will try to use a currency price. If no default
     * currency price exists the function will throw an error.
     * @param {string} addOnId - the id of the add-on to get price from
     * @param {string} regionId - the id of the region to get price for
     * @return {number} the price specific to the region
     */

  }, {
    key: "getRegionPrice",
    value: function () {
      var _getRegionPrice = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(addOnId, regionId) {
        var addOn, region, price;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.retrieve(addOnId);

              case 2:
                addOn = _context6.sent;
                _context6.next = 5;
                return this.regionService_.retrieve(regionId);

              case 5:
                region = _context6.sent;
                addOn.prices.forEach(function (_ref2) {
                  var amount = _ref2.amount,
                      currency_code = _ref2.currency_code;

                  if (!price && currency_code === region.currency_code) {
                    // If we haven't yet found a price and the current money amount is
                    // the default money amount for the currency of the region we have found
                    // a possible price match
                    price = amount;
                  } else if (region_id === region._id) {
                    // If the region matches directly with the money amount this is the best
                    // price
                    price = amount;
                  }
                }); // Return the price if we found a suitable match

                if (!(price !== undefined)) {
                  _context6.next = 9;
                  break;
                }

                return _context6.abrupt("return", price);

              case 9:
                throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.NOT_FOUND, "A price for region: ".concat(region.name, " could not be found"));

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getRegionPrice(_x7, _x8) {
        return _getRegionPrice.apply(this, arguments);
      }

      return getRegionPrice;
    }()
    /**
     * Decorates a add-on with add-on variants.
     * @param {AddOn} addOn - the add-on to decorate.
     * @param {string[]} fields - the fields to include.
     * @param {string[]} expandFields - fields to expand.
     * @return {AddOn} return the decorated add-on.
     */

  }, {
    key: "decorate",
    value: function () {
      var _decorate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(addOn, fields) {
        var _this4 = this;

        var expandFields,
            requiredFields,
            decorated,
            _args8 = arguments;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                expandFields = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : [];
                requiredFields = ["_id", "metadata"];
                decorated = _lodash["default"].pick(addOn, fields.concat(requiredFields));

                if (!expandFields.includes("valid_for")) {
                  _context8.next = 7;
                  break;
                }

                _context8.next = 6;
                return Promise.all(decorated.valid_for.map( /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(p) {
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            _context7.next = 2;
                            return _this4.productService_.retrieve(p);

                          case 2:
                            return _context7.abrupt("return", _context7.sent);

                          case 3:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function (_x11) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 6:
                decorated.valid_for = _context8.sent;

              case 7:
                return _context8.abrupt("return", decorated);

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function decorate(_x9, _x10) {
        return _decorate.apply(this, arguments);
      }

      return decorate;
    }()
    /**
     * Dedicated method to set metadata for an add-on.
     * To ensure that plugins does not overwrite each
     * others metadata fields, setMetadata is provided.
     * @param {string} addOnId - the add-on to decorate.
     * @param {string} key - key for metadata field
     * @param {string} value - value for metadata field.
     * @return {Promise} resolves to the updated result.
     */

  }, {
    key: "setMetadata",
    value: function () {
      var _setMetadata = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(addOnId, key, value) {
        var _this5 = this;

        var validatedId, keyPath;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                validatedId = this.validateId_(addOnId);

                if (!(typeof key !== "string")) {
                  _context9.next = 3;
                  break;
                }

                throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.INVALID_ARGUMENT, "Key type is invalid. Metadata keys must be strings");

              case 3:
                keyPath = "metadata.".concat(key);
                return _context9.abrupt("return", this.addOnModel_.updateOne({
                  _id: validatedId
                }, {
                  $set: _defineProperty({}, keyPath, value)
                }).then(function (result) {
                  _this5.eventBus_.emit(AddOnService.Events.UPDATED, result);

                  return result;
                })["catch"](function (err) {
                  throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.DB_ERROR, err.message);
                }));

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function setMetadata(_x12, _x13, _x14) {
        return _setMetadata.apply(this, arguments);
      }

      return setMetadata;
    }()
  }]);

  return AddOnService;
}(_medusaInterfaces.BaseService);

_defineProperty(AddOnService, "Events", {
  UPDATED: "add_on.updated",
  CREATED: "add_on.created"
});

var _default = AddOnService;
exports["default"] = _default;