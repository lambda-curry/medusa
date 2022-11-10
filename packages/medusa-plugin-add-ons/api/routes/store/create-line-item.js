"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _medusaCoreUtils = require("medusa-core-utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, schema, _schema$validate, value, error, lineItemService, cartService, cart, lineItem;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            schema = _medusaCoreUtils.Validator.object().keys({
              variant_id: _medusaCoreUtils.Validator.string().required(),
              quantity: _medusaCoreUtils.Validator.number().required(),
              add_ons: _medusaCoreUtils.Validator.array().items(_medusaCoreUtils.Validator.string()).optional(),
              metadata: _medusaCoreUtils.Validator.object().optional()
            });
            _schema$validate = schema.validate(req.body), value = _schema$validate.value, error = _schema$validate.error;

            if (!error) {
              _context.next = 5;
              break;
            }

            throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.INVALID_DATA, error.details);

          case 5:
            _context.prev = 5;
            lineItemService = req.scope.resolve("addOnLineItemService");
            cartService = req.scope.resolve("cartService");
            _context.next = 10;
            return cartService.retrieve(id);

          case 10:
            cart = _context.sent;
            _context.next = 13;
            return lineItemService.generate(value.variant_id, cart.region_id, value.quantity, value.add_ons, value.metadata);

          case 13:
            lineItem = _context.sent;
            _context.next = 16;
            return cartService.addLineItem(cart._id, lineItem);

          case 16:
            cart = _context.sent;
            _context.next = 19;
            return cartService.decorate(cart, [], ["region"]);

          case 19:
            cart = _context.sent;
            res.status(200).json({
              cart: cart
            });
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](5);
            throw _context.t0;

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 23]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;