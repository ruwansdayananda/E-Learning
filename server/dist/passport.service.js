"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_local_1 = __importDefault(require("passport-local"));
var passport_1 = __importDefault(require("passport"));
var base_module_1 = require("./core/base.module");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var user_service_1 = require("./user/user.service");
var PassportService = /** @class */ (function (_super) {
    __extends(PassportService, _super);
    function PassportService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //local Stratergy
        _this.LocalStrategy = passport_local_1.default.Strategy;
        _this.service = base_module_1.inject(user_service_1.UserService);
        return _this;
    }
    PassportService.prototype.setup = function () {
        var _this = this;
        passport_1.default.use(new this.LocalStrategy({ usernameField: 'email' }, function (email, password, done) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.service.getUser(email)];
                    case 1:
                        user = _a.sent();
                        bcryptjs_1.default.compare(password, user.password, function (err, isMatch) {
                            if (err)
                                throw err;
                            if (isMatch) {
                                return done(null, user);
                            }
                            else {
                                return done(null, false, { message: 'password incorrect!' });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); }));
        passport_1.default.serializeUser(function (user, done) {
            done(null, user.email);
        });
        passport_1.default.deserializeUser(function (email, done) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.service.getUser(email)];
                    case 1:
                        user = _a.sent();
                        done(null, user);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return PassportService;
}(base_module_1.BaseModule));
exports.PassportService = PassportService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3BvcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3Bhc3Nwb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLHNEQUFnQztBQUNoQyxpREFBdUQ7QUFDdkQsc0RBQThCO0FBQzlCLG9EQUFrRDtBQUVsRDtJQUFxQyxtQ0FBVTtJQUEvQztRQUFBLHFFQTJCQztRQTFCQyxpQkFBaUI7UUFDakIsbUJBQWEsR0FBRyx3QkFBYSxDQUFDLFFBQVEsQ0FBQztRQUN2QyxhQUFPLEdBQUcsb0JBQU0sQ0FBQywwQkFBVyxDQUFDLENBQUM7O0lBd0JoQyxDQUFDO0lBdEJDLCtCQUFLLEdBQUw7UUFBQSxpQkFxQkM7UUFwQkMsa0JBQVEsQ0FBQyxHQUFHLENBQ1YsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxFQUFFLFVBQU8sS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJOzs7OzRCQUNoRSxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQTs7d0JBQXhDLElBQUksR0FBRyxTQUFpQzt3QkFDOUMsa0JBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTzs0QkFDbkQsSUFBSSxHQUFHO2dDQUFFLE1BQU0sR0FBRyxDQUFDOzRCQUNuQixJQUFJLE9BQU8sRUFBRTtnQ0FDWCxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7NkJBQ3pCO2lDQUFNO2dDQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxDQUFDOzZCQUM5RDt3QkFDSCxDQUFDLENBQUMsQ0FBQzs7OzthQUNKLENBQUMsQ0FDSCxDQUFDO1FBQ0Ysa0JBQVEsQ0FBQyxhQUFhLENBQUMsVUFBQyxJQUFTLEVBQUUsSUFBSTtZQUNyQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUNILGtCQUFRLENBQUMsZUFBZSxDQUFDLFVBQU8sS0FBSyxFQUFFLElBQUk7Ozs7NEJBQzVCLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFBOzt3QkFBeEMsSUFBSSxHQUFHLFNBQWlDO3dCQUM5QyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7O2FBQ2xCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUEzQkQsQ0FBcUMsd0JBQVUsR0EyQjlDO0FBM0JZLDBDQUFlIn0=