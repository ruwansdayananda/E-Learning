"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var PRIVATE_CONSTRUCTOR_TOKEN = Symbol('DANGEROUSLY USE CONSTRUCTOR');
var BaseModule = /** @class */ (function () {
    function BaseModule(privateConstructorToken) {
        this.__SINGLETON__ = false;
        void privateConstructorToken;
    }
    BaseModule.willInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    BaseModule.prototype.didInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    BaseModule.getInstance = function () {
        if (!this.instance || this.instance.__SINGLETON__ !== true) {
            this.instance = new this(PRIVATE_CONSTRUCTOR_TOKEN);
        }
        return this.instance;
    };
    BaseModule.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var instance, _i, _a, key, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.willInit()];
                    case 1:
                        _d.sent();
                        if (this.instance) {
                            this.getInstance();
                            return [2 /*return*/, this.instance];
                        }
                        instance = this.getInstance();
                        _i = 0, _a = Object.keys(instance);
                        _d.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        if (!instance[key].__IS_DEPENDENCY__) return [3 /*break*/, 4];
                        _b = instance;
                        _c = key;
                        return [4 /*yield*/, instance[key].promise];
                    case 3:
                        _b[_c] = _d.sent();
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, instance.didInit()];
                    case 6:
                        _d.sent();
                        return [2 /*return*/, instance];
                }
            });
        });
    };
    return BaseModule;
}());
exports.BaseModule = BaseModule;
function inject(ClassName) {
    // @ts-ignore
    return { promise: ClassName.init(), __IS_DEPENDENCY__: true };
}
exports.inject = inject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb3JlL2Jhc2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSx5QkFBeUIsR0FBRyxNQUFNLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUV4RTtJQUlFLG9CQUFtQix1QkFBeUQ7UUFGckUsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFHM0IsS0FBSyx1QkFBdUIsQ0FBQztJQUMvQixDQUFDO0lBRXNCLG1CQUFRLEdBQS9COzs7Ozs7S0FFQztJQUVlLDRCQUFPLEdBQXZCOzs7Ozs7S0FFQztJQUVNLHNCQUFXLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssSUFBSSxFQUFFO1lBQzFELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUNyRDtRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRW1CLGVBQUksR0FBeEI7Ozs7OzRCQUNFLHFCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQTs7d0JBQXJCLFNBQXFCLENBQUM7d0JBQ3RCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTs0QkFDakIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUNuQixzQkFBTyxJQUFJLENBQUMsUUFBUSxFQUFDO3lCQUN0Qjt3QkFDSyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzhCQUVHLEVBQXJCLEtBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs2QkFBckIsQ0FBQSxjQUFxQixDQUFBO3dCQUE1QixHQUFHOzZCQUNSLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsRUFBL0Isd0JBQStCO3dCQUNqQyxLQUFBLFFBQVEsQ0FBQTt3QkFBQyxLQUFBLEdBQUcsQ0FBQTt3QkFBSSxxQkFBTSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFBOzt3QkFBM0MsTUFBYSxHQUFHLFNBQTJCLENBQUM7Ozt3QkFGOUIsSUFBcUIsQ0FBQTs7NEJBTXZDLHFCQUFNLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBQTs7d0JBQXhCLFNBQXdCLENBQUM7d0JBQ3pCLHNCQUFPLFFBQVEsRUFBQzs7OztLQUNqQjtJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQXhDRCxJQXdDQztBQXhDWSxnQ0FBVTtBQTBDdkIsU0FBZ0IsTUFBTSxDQUE4QixTQUFZO0lBQzlELGFBQWE7SUFDYixPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUNoRSxDQUFDO0FBSEQsd0JBR0MifQ==