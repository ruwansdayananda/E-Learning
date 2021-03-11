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
const __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
require('tsconfig-paths/register');
const express_1 = __importDefault(require('express'));
const path_1 = __importDefault(require('path'));
const passport_1 = __importDefault(require('passport'));
const router_1 = require('./router');
const error_handlers_1 = require('./core/error-handlers');
const database_connection_1 = require('./core/database.connection');
const express_session_1 = __importDefault(require('express-session'));
const passport_service_1 = require('./passport.service');
const express_fileupload_1 = __importDefault(require('express-fileupload'));
const app = express_1.default();
function main() {
  return __awaiter(this, void 0, void 0, function () {
    let passportService, _a, _b, _c, PORT;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          return [4 /*yield*/, database_connection_1.DatabaseConnection.init()];
        case 1:
          _d.sent();
          return [4 /*yield*/, passport_service_1.PassportService.init()];
        case 2:
          passportService = _d.sent();
          //passport setup
          passportService.setup();
          // register core middleware
          app.use(express_fileupload_1.default());
          app.use(express_1.default.json());
          app.use(express_1.default.urlencoded({ extended: false }));
          //Express Session
          app.use(
            express_session_1.default({
              secret: 'secret',
              resave: true,
              saveUninitialized: true,
            }),
          );
          //passport middleware
          app.use(passport_1.default.initialize());
          app.use(passport_1.default.session());
          // register application routes
          _b = (_a = app).use;
          _c = ['/api'];
          return [4 /*yield*/, router_1.RootRouter.getRouter()];
        case 3:
          // register application routes
          _b.apply(_a, _c.concat([_d.sent()]));
          // register the webapp assets and root index.html
          app.use(express_1.default.static(path_1.default.resolve('build')));
          app.use('/', function (req, res) {
            return res.sendFile(path_1.default.resolve(`${__dirname}/../build/index.html`));
          });
          // register error handler middleware
          app.use(error_handlers_1.notFoundHandler);
          app.use(error_handlers_1.internalErrorHandler);
          PORT = process.env.port || 8000;
          return [
            2 /*return*/,
            app.listen(PORT, function () {
              console.log(`Server started in port ${PORT}`);
            }),
          ];
      }
    });
  });
}
// exports.main = main;
//
// main().then(console.log).then(console.log);
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBaUM7QUFDakMsb0RBQThCO0FBQzlCLDhDQUF3QjtBQUN4QixzREFBZ0M7QUFDaEMsbUNBQXNDO0FBQ3RDLHVEQUE2RTtBQUM3RSxpRUFBK0Q7QUFDL0Qsb0VBQXNDO0FBQ3RDLHVEQUFxRDtBQUNyRCwwRUFBNEM7QUFFNUMsSUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0FBRXRCLFNBQXNCLElBQUk7Ozs7O3dCQUN4QixxQkFBTSx3Q0FBa0IsQ0FBQyxJQUFJLEVBQUUsRUFBQTs7b0JBQS9CLFNBQStCLENBQUM7b0JBQ1IscUJBQU0sa0NBQWUsQ0FBQyxJQUFJLEVBQUUsRUFBQTs7b0JBQTlDLGVBQWUsR0FBRyxTQUE0QjtvQkFFcEQsZ0JBQWdCO29CQUNoQixlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRXhCLDJCQUEyQjtvQkFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyw0QkFBVSxFQUFFLENBQUMsQ0FBQztvQkFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUVqRCxpQkFBaUI7b0JBQ2pCLEdBQUcsQ0FBQyxHQUFHLENBQ0wseUJBQU8sQ0FBQzt3QkFDTixNQUFNLEVBQUUsUUFBUTt3QkFDaEIsTUFBTSxFQUFFLElBQUk7d0JBQ1osaUJBQWlCLEVBQUUsSUFBSTtxQkFDeEIsQ0FBQyxDQUNILENBQUM7b0JBRUYscUJBQXFCO29CQUNyQixHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQzVCLDhCQUE4QjtvQkFDOUIsS0FBQSxDQUFBLEtBQUEsR0FBRyxDQUFBLENBQUMsR0FBRyxDQUFBOzBCQUFDLE1BQU07b0JBQUUscUJBQU0sbUJBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7b0JBRDVDLDhCQUE4QjtvQkFDOUIsd0JBQWdCLFNBQTRCLEdBQUMsQ0FBQztvQkFFOUMsaURBQWlEO29CQUNqRCxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUksU0FBUyx5QkFBc0IsQ0FBQyxDQUFDLEVBQTlELENBQThELENBQUMsQ0FBQztvQkFFM0Ysb0NBQW9DO29CQUNwQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdDQUFlLENBQUMsQ0FBQztvQkFDekIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQ0FBb0IsQ0FBQyxDQUFDO29CQUV4QixJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO29CQUN0QyxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTs0QkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBMEIsSUFBTSxDQUFDLENBQUM7d0JBQ2hELENBQUMsQ0FBQyxFQUFDOzs7O0NBQ0o7QUF2Q0Qsb0JBdUNDO0FBQ0QsRUFBRTtBQUNGLDhDQUE4QztBQUM5QyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMifQ==
