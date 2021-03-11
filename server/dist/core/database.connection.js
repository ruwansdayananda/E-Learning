const __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (const p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
const __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    let _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
require('reflect-metadata');
const typeorm_1 = require('typeorm');
const base_module_1 = require('./base.module');
const DatabaseConnection = /** @class */ (function (_super) {
  __extends(DatabaseConnection, _super);
  function DatabaseConnection() {
    const _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.__SINGLETON__ = true;
    return _this;
  }
  DatabaseConnection.prototype.didInit = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!process.env.TEST_DB) return [3 /*break*/, 2];
            return [
              4 /*yield*/,
              typeorm_1.createConnection({
                type: 'sqljs',
                synchronize: true,
                dropSchema: true,
                entities: [`${__dirname}/../**/*.entity.ts`],
              }),
            ];
          case 1:
            _a.sent();
            return [2 /*return*/];
          case 2:
            return [
              4 /*yield*/,
              typeorm_1.createConnection({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'Windy@24',
                database: 'eLearning',
                entities: [`${__dirname}/../**/*.entity.ts`],
                logging: false,
              }),
            ];
          case 3:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  return DatabaseConnection;
})(base_module_1.BaseModule);
exports.DatabaseConnection = DatabaseConnection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvcmUvZGF0YWJhc2UuY29ubmVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFDMUIsbUNBQTJDO0FBQzNDLGlEQUErQztBQUcvQztJQUF3QyxzQ0FBVTtJQUFsRDtRQUFBLHFFQTBCQztRQXpCQyxtQkFBYSxHQUFHLElBQUksQ0FBQzs7SUF5QnZCLENBQUM7SUF2Qk8sb0NBQU8sR0FBYjs7Ozs7NkJBQ00sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQW5CLHdCQUFtQjt3QkFDckIscUJBQU0sMEJBQWdCLENBQUM7Z0NBQ3JCLElBQUksRUFBRSxPQUFPO2dDQUNiLFdBQVcsRUFBRSxJQUFJO2dDQUNqQixVQUFVLEVBQUUsSUFBSTtnQ0FDaEIsUUFBUSxFQUFFLENBQUksU0FBUyx1QkFBb0IsQ0FBQzs2QkFDbkIsQ0FBQyxFQUFBOzt3QkFMNUIsU0FLNEIsQ0FBQzt3QkFDN0Isc0JBQU87NEJBRVQscUJBQU0sMEJBQWdCLENBQUM7NEJBQ3JCLElBQUksRUFBRSxPQUFPOzRCQUNiLElBQUksRUFBRSxXQUFXOzRCQUNqQixJQUFJLEVBQUUsSUFBSTs0QkFDVixRQUFRLEVBQUUsTUFBTTs0QkFDaEIsUUFBUSxFQUFFLFVBQVU7NEJBQ3BCLFFBQVEsRUFBRSxXQUFXOzRCQUNyQixRQUFRLEVBQUUsQ0FBSSxTQUFTLHVCQUFvQixDQUFDOzRCQUM1QyxPQUFPLEVBQUUsS0FBSzt5QkFDZixDQUFDLEVBQUE7O3dCQVRGLFNBU0UsQ0FBQzs7Ozs7S0FFSjtJQUVILHlCQUFDO0FBQUQsQ0FBQyxBQTFCRCxDQUF3Qyx3QkFBVSxHQTBCakQ7QUExQlksZ0RBQWtCIn0=
