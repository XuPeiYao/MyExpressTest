"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//#region Routing
function routing(path) {
    return function (target, // The class the decorator is declared on
        propertyKey, descriptor) {
        target.attributes = target.attributes || {};
        target.attributes.routing = path;
        if (descriptor && descriptor.value) {
            descriptor.value.attributes = descriptor.value.attributes || {};
            descriptor.value.attributes.routing = path;
        }
    };
}
//#endregion
var Controller = (function () {
    function Controller() {
    }
    Controller.prototype.onRouting = function (req, res) {
        this.request = req;
        this.response = res;
        /*var method = req.path.substring(req.route.path.length - 1);

        var index = method.indexOf('?');
        if (index == -1) index = method.length;*/
        var method = req.params[0]; //method.substring(0, index);
        for (var key in this) {
            if (!(this[key] instanceof Function))
                continue;
            if (key == 'constructor')
                continue;
            if (key == 'onRouting')
                continue;
            if (!this[key].attributes)
                continue;
            if (this[key].attributes.routing != method)
                continue;
            res.json(this[key]());
            return;
        }
        res.json(this[method]());
    };
    return Controller;
}());
exports.Controller = Controller;
var userController = (function (_super) {
    __extends(userController, _super);
    function userController() {
        _super.apply(this, arguments);
    }
    userController.prototype.test = function () {
        return { "echo": this.request.query.value };
    };
    __decorate([
        routing('echo')
    ], userController.prototype, "test", null);
    userController = __decorate([
        routing('/api/user/')
    ], userController);
    return userController;
}(Controller));
exports.userController = userController;
//# sourceMappingURL=userController.js.map