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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var AddOnLineItemService = /*#__PURE__*/function (_BaseService) {
  _inherits(AddOnLineItemService, _BaseService);

  var _super = _createSuper(AddOnLineItemService);

  function AddOnLineItemService(_ref, options) {
    var _this;

    var addOnService = _ref.addOnService,
        productService = _ref.productService,
        productVariantService = _ref.productVariantService,
        regionService = _ref.regionService,
        eventBusService = _ref.eventBusService;

    _classCallCheck(this, AddOnLineItemService);

    _this = _super.call(this);
    _this.addOnService_ = addOnService;
    _this.productService_ = productService;
    _this.productVariantService_ = productVariantService;
    _this.regionService_ = regionService;
    _this.eventBus_ = eventBusService;
    _this.options_ = options;
    return _this;
  }
  /**
   * Generates a line item.
   * @param {string} variantId - id of the line item variant
   * @param {*} regionId - id of the cart region
   * @param {*} quantity - number of items
   * @param {[string]} addOnIds - id of add-ons
   */


  _createClass(AddOnLineItemService, [{
    key: "generate",
    value: function () {
      var _generate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(variantId, regionId, quantity, addOnIds) {
        var _this2 = this,
            _line;

        var metadata,
            variant,
            region,
            products,
            product,
            unitPrice,
            addOnPrices,
            line,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                metadata = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : {};
                _context2.next = 3;
                return this.productVariantService_.retrieve(variantId);

              case 3:
                variant = _context2.sent;
                _context2.next = 6;
                return this.regionService_.retrieve(regionId);

              case 6:
                region = _context2.sent;
                _context2.next = 9;
                return this.productService_.list({
                  variants: variantId
                });

              case 9:
                products = _context2.sent;

                if (products.length) {
                  _context2.next = 12;
                  break;
                }

                throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.INVALID_DATA, "Could not find product for variant with id: ".concat(variantId));

              case 12:
                product = products[0];
                _context2.next = 15;
                return this.productVariantService_.getRegionPrice(variant._id, region._id);

              case 15:
                unitPrice = _context2.sent;
                _context2.next = 18;
                return Promise.all(addOnIds.map( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
                    var addOn;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _this2.addOnService_.retrieve(id);

                          case 2:
                            addOn = _context.sent;

                            if (addOn.valid_for.includes("".concat(product._id))) {
                              _context.next = 7;
                              break;
                            }

                            throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.INVALID_DATA, "".concat(addOn.name, " can not be added to ").concat(product.title));

                          case 7:
                            _context.next = 9;
                            return _this2.addOnService_.getRegionPrice(id, region._id);

                          case 9:
                            return _context.abrupt("return", _context.sent);

                          case 10:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x5) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 18:
                addOnPrices = _context2.sent;
                unitPrice += _lodash["default"].sum(addOnPrices);
                line = (_line = {
                  title: product.title,
                  quantity: quantity,
                  thumbnail: product.thumbnail,
                  should_merge: false,
                  content: {
                    unit_price: unitPrice * quantity,
                    variant: variant,
                    product: product,
                    quantity: 1
                  }
                }, _defineProperty(_line, "should_merge", false), _defineProperty(_line, "metadata", _objectSpread(_objectSpread({}, metadata), {}, {
                  add_ons: addOnIds
                })), _line);
                return _context2.abrupt("return", line);

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function generate(_x, _x2, _x3, _x4) {
        return _generate.apply(this, arguments);
      }

      return generate;
    }()
  }, {
    key: "decorate",
    value: function () {
      var _decorate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(lineItem, fields) {
        var _this3 = this;

        var expandFields,
            requiredFields,
            decorated,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                expandFields = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : [];
                requiredFields = ["_id", "metadata"];
                decorated = _lodash["default"].pick(lineItem, fields.concat(requiredFields));

                if (!(expandFields.includes("add_ons") && decorated.metadata && decorated.metadata.add_ons)) {
                  _context4.next = 7;
                  break;
                }

                _context4.next = 6;
                return Promise.all(decorated.metadata.add_ons.map( /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ao) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _this3.addOnService_.retrieve(ao);

                          case 2:
                            return _context3.abrupt("return", _context3.sent);

                          case 3:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x8) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 6:
                decorated.metadata.add_ons = _context4.sent;

              case 7:
                return _context4.abrupt("return", decorated);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function decorate(_x6, _x7) {
        return _decorate.apply(this, arguments);
      }

      return decorate;
    }()
  }]);

  return AddOnLineItemService;
}(_medusaInterfaces.BaseService);

_defineProperty(AddOnLineItemService, "Events", {
  UPDATED: "add_on.updated",
  CREATED: "add_on.created"
});

var _default = AddOnLineItemService;
exports["default"] = _default;