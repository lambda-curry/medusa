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
    var _req$params, id, line_id, schema, _schema$validate, value, error, lineItemService, cartService, cart, existing, lineItem;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$params = req.params, id = _req$params.id, line_id = _req$params.line_id;
            schema = _medusaCoreUtils.Validator.object().keys({
              add_ons: _medusaCoreUtils.Validator.array().items(_medusaCoreUtils.Validator.string()).optional(),
              quantity: _medusaCoreUtils.Validator.number().optional(),
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

            if (!(value.quantity === 0)) {
              _context.next = 14;
              break;
            }

            _context.next = 11;
            return cartService.removeLineItem(id, line_id);

          case 11:
            cart = _context.sent;
            _context.next = 26;
            break;

          case 14:
            _context.next = 16;
            return cartService.retrieve(id);

          case 16:
            cart = _context.sent;
            existing = cart.items.find(function (i) {
              return i._id.equals(line_id);
            });

            if (existing) {
              _context.next = 20;
              break;
            }

            throw new _medusaCoreUtils.MedusaError(_medusaCoreUtils.MedusaError.Types.INVALID_DATA, "Could not find the line item");

          case 20:
            _context.next = 22;
            return lineItemService.generate(existing.content.variant._id, cart.region_id, value.quantity, value.add_ons, value.metadata);

          case 22:
            lineItem = _context.sent;
            _context.next = 25;
            return cartService.updateLineItem(cart._id, line_id, lineItem);

          case 25:
            cart = _context.sent;

          case 26:
            _context.next = 28;
            return cartService.decorate(cart, [], ["region"]);

          case 28:
            cart = _context.sent;
            res.status(200).json({
              cart: cart
            });
            _context.next = 35;
            break;

          case 32:
            _context.prev = 32;
            _context.t0 = _context["catch"](5);
            throw _context.t0;

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 32]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;