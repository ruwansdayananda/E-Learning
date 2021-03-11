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
Object.defineProperty(exports, "__esModule", { value: true });
var base_module_1 = require("../core/base.module");
var user_dao_1 = require("./user.dao");
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__SINGLETON__ = true;
        _this.dao = base_module_1.inject(user_dao_1.UserDao);
        return _this;
    }
    UserService.prototype.saveUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.saveUser(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.saveAssignment = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.saveAssignment(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.saveFileInfo = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.saveFileInfo(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getFileInfo = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getFileInfo(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getFileName = function (upload_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getFileName(upload_id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getUser = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getUser(email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getUserInformation = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getUserInformation(email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.listAssignments = function (email, grade) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.listAssignments(email, grade)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getStudentInformation = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getStudentInformation(email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getFileLocation = function (upload_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getFileLocation(upload_id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.listCompletedAssignments = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.listCompletedAssignments(email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.writeToUploadsTable = function (upload_id, filename, file_size, fileExtension, mimetype) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.writeToUploadsTable(upload_id, filename, file_size, fileExtension, mimetype)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.writeToSubmissionTable = function (updated_upload_id, assignment_id, email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.writeToSubmissionTable(updated_upload_id, assignment_id, email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getLastUploadID = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getLastUploadID()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // async getTeacherSubject(email) {
    //   return await this.dao.getTeacherSubject(email);
    // }
    // async getAvailableGrades() {
    //   return await this.dao.getAvailableGrades();
    // }
    UserService.prototype.getUserSubjects = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getUserSubjects(email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getUserStudyMaterial = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getUserStudyMaterial(email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.saveStudyMatInfo = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.saveStudyMatInfo(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getMarksInformation = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getMarksInformation(email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getGrade = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getGrade(email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getAssignmentID = function (upload_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getAssignmentID(upload_id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getSubjectID = function (assignment_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getSubjectID(assignment_id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.writeToMarksTable = function (student_email, teacher_email, assignment_id, subject_id, marks, comment) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.writeToMarksTable(student_email, teacher_email, assignment_id, subject_id, marks, comment)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getSubmissionForAssignement = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getSubmissionForAssignement(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getTeacherSubject = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getTeacherSubject(email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getTeacherAssignmets = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getTeacherAssignmets(email)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getAvailableGrades = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getAvailableGrades()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.addSubject = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.addSubject(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getSubjects = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getSubjects()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.addGradeSubjects = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.addGradeSubjects(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getGradeSubjects = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getGradeSubjects()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getGrades = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getGrades()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserService;
}(base_module_1.BaseModule));
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdXNlci91c2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXlEO0FBQ3pELHVDQUFxQztBQUVyQztJQUFpQywrQkFBVTtJQUEzQztRQUFBLHFFQWdJQztRQS9IQyxtQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixTQUFHLEdBQUcsb0JBQU0sQ0FBQyxrQkFBTyxDQUFDLENBQUM7O0lBOEh4QixDQUFDO0lBNUhPLDhCQUFRLEdBQWQsVUFBZSxJQUFJOzs7OzRCQUNWLHFCQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFBOzRCQUFwQyxzQkFBTyxTQUE2QixFQUFDOzs7O0tBQ3RDO0lBQ0ssb0NBQWMsR0FBcEIsVUFBcUIsSUFBSTs7Ozs0QkFDaEIscUJBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUE7NEJBQTFDLHNCQUFPLFNBQW1DLEVBQUM7Ozs7S0FDNUM7SUFDSyxrQ0FBWSxHQUFsQixVQUFtQixJQUFJOzs7OzRCQUNkLHFCQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFBOzRCQUF4QyxzQkFBTyxTQUFpQyxFQUFDOzs7O0tBQzFDO0lBQ0ssaUNBQVcsR0FBakIsVUFBa0IsSUFBSTs7Ozs0QkFDYixxQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBQTs0QkFBdkMsc0JBQU8sU0FBZ0MsRUFBQzs7OztLQUN6QztJQUNLLGlDQUFXLEdBQWpCLFVBQWtCLFNBQVM7Ozs7NEJBQ2xCLHFCQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFBOzRCQUE1QyxzQkFBTyxT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