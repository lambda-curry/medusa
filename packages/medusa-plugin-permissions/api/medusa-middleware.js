"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// This middleware is injected to ensure authorization of requests
// Since this middleware uses the user object on the request, this should be
// injected after authentication in the core middleware, hence we name
// the middleware postAuth.
var _default = {
  postAuthentication: function postAuthentication() {
    return function (err, req, res, next) {
      var permissionService = req.scope.resolve("permissionService");

      if (permissionService.hasPermission(req.user, req.method, req.path)) {
        next();
      } else {
        res.status(422);
      }
    };
  }
};
exports["default"] = _default;