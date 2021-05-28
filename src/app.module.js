"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.AppModule = void 0;
var tests_module_1 = require("./tests/tests.module");
var common_1 = require("@nestjs/common");
var auth_user_provider_1 = require("./provider/auth_user.provider");
var database_provider_1 = require("./provider/database.provider");
var mybatis_provider_1 = require("./provider/mybatis.provider");
var post_module_1 = require("./post/post.module");
var post_comment_module_1 = require("./post-comment.ts/post-comment.module");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var auth_module_1 = require("./auth/auth.module");
var user_module_1 = require("./user/user.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [tests_module_1.TestsModule, post_module_1.PostModule, post_comment_module_1.PostCommentModule, auth_module_1.AuthModule, user_module_1.UserModule],
            controllers: [app_controller_1.AppController],
            providers: __spreadArray([
                app_service_1.AppService,
                auth_user_provider_1.AuthUser,
                mybatis_provider_1.Mybatis
            ], database_provider_1.databaseProviders)
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
