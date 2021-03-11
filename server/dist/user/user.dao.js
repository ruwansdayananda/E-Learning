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
const __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const base_dao_1 = require('../core/base.dao');
const dayjs_1 = __importDefault(require('dayjs'));
const bcryptjs_1 = __importDefault(require('bcryptjs'));
const UserDao = /** @class */ (function (_super) {
  __extends(UserDao, _super);
  function UserDao() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  UserDao.prototype.saveUser = function (_a) {
    const name = _a.name,
      birthday = _a.birthday,
      signInAs = _a.signInAs,
      email = _a.email,
      password = _a.password,
      grade_id = _a.grade_id,
      subject_id = _a.subject_id,
      telephone = _a.telephone;
    return __awaiter(this, void 0, void 0, function () {
      let _b, _c, _d;
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            if (!(signInAs === 'student')) return [3 /*break*/, 2];
            return [
              4 /*yield*/,
              this.query(
                '\n        INSERT INTO student (email,grade_id)\n        VALUES (?, ?)\n    ',
                [email, grade_id],
              ),
            ];
          case 1:
            _e.sent();
            _e.label = 2;
          case 2:
            if (!(signInAs === 'teacher')) return [3 /*break*/, 4];
            return [
              4 /*yield*/,
              this.query(
                '\n        INSERT INTO teacher (email,subject_id,telephone)\n        VALUES (?, ?, ?)\n    ',
                [email, subject_id, telephone],
              ),
            ];
          case 3:
            _e.sent();
            _e.label = 4;
          case 4:
            _b = this.query;
            _c = [
              '\n        INSERT INTO user (email,name,birthday, password, type)\n        VALUES (?, ?, ?, ?, ?)\n    ',
            ];
            _d = [email, name, dayjs_1.default(birthday).format('YYYY-MM-DD')];
            return [4 /*yield*/, this.hashPassword(password)];
          case 5:
            return [4 /*yield*/, _b.apply(this, _c.concat([_d.concat([_e.sent(), signInAs])]))];
          case 6:
            return [2 /*return*/, _e.sent()];
        }
      });
    });
  };
  UserDao.prototype.saveAssignment = function (_a) {
    let title = _a.title,
      due_date = _a.due_date,
      description = _a.description,
      upload_id = _a.upload_id,
      assignment_id = _a.assignment_id,
      user_email = _a.user_email,
      subject_id = _a.subject_id,
      grade_id = _a.grade_id,
      upload_date = _a.upload_date,
      file_name = _a.file_name,
      file_type = _a.file_type,
      file_size = _a.file_size,
      mimetype = _a.mimetype;
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!(upload_id != '')) return [3 /*break*/, 2];
            return [
              4 /*yield*/,
              this.query(
                '\n          INSERT INTO upload ( upload_id, file_name, file_size, file_type, upload_date, mimetype)\n          VALUES (?, ?, ?, ?, ?,?)\n      ',
                [
                  upload_id,
                  file_name,
                  file_size,
                  file_type,
                  dayjs_1.default(upload_date).format('YYYY-MM-DD'),
                  mimetype,
                ],
              ),
            ];
          case 1:
            _b.sent();
            return [3 /*break*/, 3];
          case 2:
            upload_id = null;
            _b.label = 3;
          case 3:
            return [
              4 /*yield*/,
              this.query(
                '\n        INSERT INTO assignment (assignment_id, upload_id, user_email, subject_id, grade_id, due_date, title, description, upload_date)\n        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)\n    ',
                [
                  assignment_id,
                  upload_id,
                  user_email,
                  subject_id,
                  grade_id,
                  due_date,
                  title,
                  description,
                  dayjs_1.default(upload_date).format('YYYY-MM-DD'),
                ],
              ),
            ];
          case 4:
            return [2 /*return*/, _b.sent()];
        }
      });
    });
  };
  UserDao.prototype.saveFileInfo = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query(
                '\n        INSERT INTO upload (upload_id, file_name, file_size, file_type, upload_date, mimetype)\n        VALUES (?, ?, ?, ?, ?, ?)\n    ',
                [
                  data.upload_id,
                  data.file_name,
                  data.file_size,
                  data.file_type,
                  data.upload_date,
                  data.mimetype,
                ],
              ),
            ];
          case 1:
            return [2 /*return*/, _a.sent()];
        }
      });
    });
  };
  ////////////////////////////////////////////////////////////////////////////
  UserDao.prototype.listAssignments = function (email, grade_id) {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query(
                '\n  SELECT assignment_id,upload_id,user_email,subject,grade_id,due_date,title,description,upload_date \n  FROM subject as s NATURAL JOIN (SELECT * from assignment where (grade_id=?) AND (due_date>now()) AND ? NOT IN(SELECT email FROM submission WHERE assignment.assignment_id=submission.assignment_id)) as d\n  ORDER BY due_date ASC;',
                [grade_id, email],
              ),
            ];
          case 1:
            rows = _a.sent();
            return [2 /*return*/, rows];
        }
      });
    });
  };
  UserDao.prototype.listCompletedAssignments = function (email) {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query(
                'SELECT assignment_id,upload_id,user_email,subject,grade_id,due_date,title,description,upload_date\n   FROM subject as s NATURAL JOIN \n   (SELECT * from assignment where ? IN(SELECT email FROM submission WHERE assignment.assignment_id=submission.assignment_id)) as d\n   ORDER BY due_date DESC LIMIT 15;',
                [email],
              ),
            ];
          case 1:
            rows = _a.sent();
            return [2 /*return*/, rows];
        }
      });
    });
  };
  UserDao.prototype.hashPassword = function (password) {
    return __awaiter(this, void 0, void 0, function () {
      let salt;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
          case 1:
            salt = _a.sent();
            return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
          case 2:
            return [2 /*return*/, _a.sent()];
        }
      });
    });
  };
  UserDao.prototype.getUser = function (email) {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query('\n    SELECT * FROM user WHERE email=?\n    ', [email]),
            ];
          case 1:
            rows = _a.sent();
            return [2 /*return*/, rows[0]];
        }
      });
    });
  };
  UserDao.prototype.getFileName = function (upload_id) {
    return __awaiter(this, void 0, void 0, function () {
      let fileName;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query('\n    SELECT file_name FROM upload WHERE upload_id= ?;\n    ', [
                upload_id,
              ]),
            ];
          case 1:
            fileName = _a.sent();
            return [2 /*return*/, fileName[0]];
        }
      });
    });
  };
  UserDao.prototype.getFileInfo = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      let type, userType, user, getData, userGrade, userSubject;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            type = data.type;
            userType = data.userType;
            user = data.user;
            if (!(userType === 'student')) return [3 /*break*/, 2];
            return [
              4 /*yield*/,
              this.query('\n    SELECT grade FROM student where email= ?;\n    ', [user]),
            ];
          case 1:
            userGrade = _a.sent();
            _a.label = 2;
          case 2:
            if (!(userType === 'teacher')) return [3 /*break*/, 4];
            return [
              4 /*yield*/,
              this.query('\n    SELECT subject_id FROM teacher where email= ?;\n    ', [user]),
            ];
          case 3:
            userSubject = _a.sent();
            _a.label = 4;
          case 4:
            if (!(type === 'assignment' && userType === 'student')) return [3 /*break*/, 6];
            return [
              4 /*yield*/,
              this.query('\n    SELECT * FROM assignment where grade= ?;\n    ', [userGrade]),
            ];
          case 5:
            getData = _a.sent();
            return [3 /*break*/, 16];
          case 6:
            if (!(type === 'assignment' && userType === 'teacher')) return [3 /*break*/, 8];
            return [
              4 /*yield*/,
              this.query('\n        SELECT * FROM assignment where user_email= ?;\n        ', [
                user,
              ]),
            ];
          case 7:
            getData = _a.sent();
            return [3 /*break*/, 16];
          case 8:
            if (!(type === 'submission' && userType === 'student')) return [3 /*break*/, 10];
            return [
              4 /*yield*/,
              this.query('\n    SELECT * FROM submission where user_email= ?;\n    ', [user]),
            ];
          case 9:
            getData = _a.sent();
            return [3 /*break*/, 16];
          case 10:
            if (!(type === 'submission' && userType === 'teacher')) return [3 /*break*/, 12];
            return [
              4 /*yield*/,
              this.query('\n    SELECT * FROM submission where grade= ?;;\n        ', [
                userSubject,
              ]),
            ];
          case 11:
            getData = _a.sent();
            return [3 /*break*/, 16];
          case 12:
            if (!(type === 'study_material' && userType === 'student')) return [3 /*break*/, 14];
            return [
              4 /*yield*/,
              this.query('\n    SELECT * FROM study_material where grade= ?;\n    ', [userGrade]),
            ];
          case 13:
            getData = _a.sent();
            return [3 /*break*/, 16];
          case 14:
            if (!(type === 'study_material' && userType === 'teacher')) return [3 /*break*/, 16];
            return [
              4 /*yield*/,
              this.query('\n    SELECT * FROM study_material where user_email= ?;\n        ', [
                user,
              ]),
            ];
          case 15:
            getData = _a.sent();
            _a.label = 16;
          case 16:
            if (getData[0] === undefined) {
              return [2 /*return*/, getData];
            } else {
              return [2 /*return*/, getData[0]];
            }
            return [2 /*return*/];
        }
      });
    });
  };
  UserDao.prototype.getUserInformation = function (email) {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query('\n    SELECT * FROM user WHERE email=?\n    ', [email]),
            ];
          case 1:
            rows = _a.sent();
            return [2 /*return*/, rows[0]];
        }
      });
    });
  };
  UserDao.prototype.getStudentInformation = function (email) {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.query('SELECT * FROM student WHERE email = ? ', [email])];
          case 1:
            rows = _a.sent();
            return [2 /*return*/, rows[0]];
        }
      });
    });
  };
  UserDao.prototype.getFileLocation = function (upload_id) {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query('\n    SELECT * FROM uploads WHERE upload_id = ?\n    ', [upload_id]),
            ];
          case 1:
            rows = _a.sent();
            return [2 /*return*/, rows[0]];
        }
      });
    });
  };
  UserDao.prototype.writeToUploadsTable = function (
    upload_id,
    filename,
    file_size,
    fileExtension,
    mimetype,
  ) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query(
                'INSERT INTO upload (upload_id,file_name, file_size, file_type,upload_date,mimetype)\n      VALUES (?,?,?,?,CURDATE(),?);\n      ',
                [upload_id, filename, file_size, fileExtension, mimetype],
              ),
            ];
          case 1:
            _a.sent();
            return [
              4 /*yield*/,
              this.query('SELECT upload_id FROM upload WHERE file_name=?', [filename]),
            ];
          case 2:
            return [2 /*return*/, _a.sent()];
        }
      });
    });
  };
  UserDao.prototype.writeToSubmissionTable = function (updated_upload_id, assignment_id, email) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query(
                'INSERT INTO submission (upload_id,assignment_id,email)\n      VALUES (?,?,?);\n      ',
                [updated_upload_id, assignment_id, email],
              ),
            ];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  UserDao.prototype.getLastUploadID = function () {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query(
                "SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name='uploads' AND table_schema=DATABASE() ;",
              ),
            ];
          case 1:
            rows = _a.sent();
            return [2 /*return*/, rows[0]];
        }
      });
    });
  };
  UserDao.prototype.getMarksInformation = function (email) {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query(
                '\n      SELECT title,marks,teacher_email,subject.subject FROM mark LEFT OUTER JOIN (assignment left outer join subject on assignment.subject_id=subject.subject_id) ON mark.assignment_id=assignment.assignment_id  WHERE student_email=?\n    ',
                [email],
              ),
            ];
          case 1:
            rows = _a.sent();
            return [2 /*return*/, rows];
        }
      });
    });
  };
  UserDao.prototype.getGrade = function (email) {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query(
                '\n      SELECT * FROM grade WHERE grade_id = (SELECT grade_id FROM student WHERE email=?)\n    ',
                [email],
              ),
            ];
          case 1:
            rows = _a.sent();
            return [2 /*return*/, rows[0]];
        }
      });
    });
  };
  UserDao.prototype.getTeacherSubject = function (email) {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query(
                '\n      SELECT * from teacher natural join subject WHERE email=?\n    \n    ',
                [email],
              ),
            ];
          case 1:
            rows = _a.sent();
            return [2 /*return*/, rows[0]];
        }
      });
    });
  };
  // async getAvailableGrades() {
  //   const rows = await this.query(
  //     `
  //     SELECT * from grade
  //   `);
  //   return rows;
  // }
  UserDao.prototype.getTeacherAssignmets = function (email) {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query(
                '\n    SELECT * from assignment WHERE user_email=? ORDER BY upload_date desc\n  \n  ',
                [email],
              ),
            ];
          case 1:
            rows = _a.sent();
            return [2 /*return*/, rows];
        }
      });
    });
  };
  UserDao.prototype.getUserSubjects = function (email) {
    return __awaiter(this, void 0, void 0, function () {
      let rows, usertype, subjects, grade, subjectTeacher;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query('\n   SELECT * FROM user WHERE email=?\n    ', [email]),
            ];
          case 1:
            rows = _a.sent();
            usertype = rows[0].type;
            subjects = [];
            if (!(usertype == 'student')) return [3 /*break*/, 4];
            return [
              4 /*yield*/,
              this.query(
                '\n      SELECT subject_id,subject FROM grade_subject INNER JOIN subject USING(subject_id) WHERE grade_id = (SELECT grade_id FROM student WHERE email=?)\n    ',
                [email],
              ),
            ];
          case 2:
            subjects = _a.sent();
            return [
              4 /*yield*/,
              this.query(
                'SELECT grade_id,grade FROM student INNER JOIN grade USING(grade_id) WHERE student.email=?',
                [email],
              ),
            ];
          case 3:
            grade = _a.sent();
            subjects.push(grade[0]);
            return [3 /*break*/, 7];
          case 4:
            if (!(usertype == 'teacher')) return [3 /*break*/, 7];
            return [
              4 /*yield*/,
              this.query(
                '\n      SELECT subject_id,subject FROM teacher INNER JOIN subject USING(subject_id) WHERE teacher.email=?\n    ',
                [email],
              ),
            ];
          case 5:
            subjectTeacher = _a.sent();
            return [4 /*yield*/, this.query('\n      SELECT grade_id,grade FROM grade;\n    ')];
          case 6:
            subjects = _a.sent();
            subjects.push(subjectTeacher);
            _a.label = 7;
          case 7:
            return [2 /*return*/, subjects];
        }
      });
    });
  };
  UserDao.prototype.getUserStudyMaterial = function (email) {
    return __awaiter(this, void 0, void 0, function () {
      let rows, usertype, study;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query('\n   SELECT * FROM user WHERE email=?\n    ', [email]),
            ];
          case 1:
            rows = _a.sent();
            usertype = rows[0].type;
            study = [];
            if (!(usertype == 'student')) return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              this.query(
                '\n       SELECT sm.titile,s.subject,s.subject_id ,u.name,sm.description,upload_id,upload_date FROM ((study_material sm INNER JOIN user u ON sm.teacher_email=u.email) INNER JOIN subject s USING(subject_id)) INNER JOIN upload USING(upload_id) WHERE grade_id=(SELECT grade_id FROM student WHERE email=?) ORDER BY study_material_id DESC;\n    ',
                [email],
              ),
            ];
          case 2:
            study = _a.sent();
            return [3 /*break*/, 5];
          case 3:
            if (!(usertype == 'teacher')) return [3 /*break*/, 5];
            return [
              4 /*yield*/,
              this.query(
                '\n      SELECT upload_id,subject,grade,description,titile,upload_date FROM study_material INNER JOIN subject USING(subject_id) INNER JOIN grade USING(grade_id) INNER JOIN upload using(upload_id) WHERE teacher_email=? ORDER BY study_material_id DESC;\n    ',
                [email],
              ),
            ];
          case 4:
            study = _a.sent();
            _a.label = 5;
          case 5:
            return [2 /*return*/, study];
        }
      });
    });
  };
  UserDao.prototype.saveStudyMatInfo = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query(
                '\n        INSERT INTO study_material (upload_id, teacher_email, subject_id, grade_id, description, titile)\n        VALUES (?, ?, ?, ?, ?,?)\n    ',
                [
                  data.upload_id,
                  data.teacher_email,
                  data.subject,
                  data.grade,
                  data.description,
                  data.title,
                ],
              ),
            ];
          case 1:
            return [2 /*return*/, _a.sent()];
        }
      });
    });
  };
  UserDao.prototype.getAvailableGrades = function () {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.query('\n      SELECT * from grade\n    \n    ')];
          case 1:
            rows = _a.sent();
            return [2 /*return*/, rows];
        }
      });
    });
  };
  UserDao.prototype.getAssignmentID = function (upload_id) {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query(
                '\n      select assignment_id from submission where (upload_id = ?);\n      ',
                [upload_id],
              ),
            ];
          case 1:
            rows = _a.sent();
            return [2 /*return*/, rows[0]];
        }
      });
    });
  };
  UserDao.prototype.getSubjectID = function (assignment_id) {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query('select subject_id from assignment where (assignment_id = ?);\n      ', [
                assignment_id,
              ]),
            ];
          case 1:
            rows = _a.sent();
            return [2 /*return*/, rows[0]];
        }
      });
    });
  };
  UserDao.prototype.writeToMarksTable = function (
    student_email,
    teacher_email,
    assignment_id,
    subject_id,
    marks,
    comment,
  ) {
    return __awaiter(this, void 0, void 0, function () {
      let rows;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            console.log(marks);
            return [
              4 /*yield*/,
              this.query(
                '\n      INSERT INTO mark (student_email,teacher_email,assignment_id,subject_id,marks,comment)\n      VALUES (?,?,?,?,?,?)\n      ',
                [student_email, teacher_email, assignment_id, subject_id, marks, comment],
              ),
            ];
          case 1:
            rows = _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  UserDao.prototype.getSubmissionForAssignement = function (assignment_id) {
    return __awaiter(this, void 0, void 0, function () {
      let rows, i;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.query(
                '\n    SELECT u.name,s.email,s.upload_id FROM submission s INNER JOIN user u ON s.email=u.email WHERE s.assignment_id=?;\n    ',
                [assignment_id],
              ),
            ];
          case 1:
            rows = _a.sent();
            for (i = 0; i < rows.length; i++) {
              rows[i].grade = '';
              rows[i].comment = '';
            }
            return [2 /*return*/, rows];
        }
      });
    });
  };
  UserDao.prototype.getGrades = function () {
    return __awaiter(this, void 0, void 0, function () {
      let data;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.query('\n  SELECT * FROM grade')];
          case 1:
            data = _a.sent();
            if (data === []) {
              return [2 /*return*/, data];
            } else {
              return [2 /*return*/, data];
            }
            return [2 /*return*/];
        }
      });
    });
  };
  UserDao.prototype.addSubject = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      const _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              data.map(function (value) {
                _this.query('\n        INSERT INTO subject (subject)\n        VALUES (?)\n    ', [
                  value,
                ]);
              }),
            ];
          case 1:
            return [2 /*return*/, _a.sent()];
        }
      });
    });
  };
  UserDao.prototype.getSubjects = function () {
    return __awaiter(this, void 0, void 0, function () {
      let data;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.query('\n  SELECT * FROM subject')];
          case 1:
            data = _a.sent();
            if (data === []) {
              return [2 /*return*/, data];
            } else {
              return [2 /*return*/, data];
            }
            return [2 /*return*/];
        }
      });
    });
  };
  UserDao.prototype.addGradeSubjects = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      const _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              data.map(function (value) {
                _this.query(
                  '\n        INSERT INTO grade_subject (grade_id , subject_id)\n        VALUES (? , ?)\n    ',
                  [value.grade_id, value.subject_id],
                );
              }),
            ];
          case 1:
            return [2 /*return*/, _a.sent()];
        }
      });
    });
  };
  UserDao.prototype.getGradeSubjects = function () {
    return __awaiter(this, void 0, void 0, function () {
      let data;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.query('\n  SELECT * FROM grade_subject')];
          case 1:
            data = _a.sent();
            if (data === []) {
              return [2 /*return*/, data];
            } else {
              return [2 /*return*/, data];
            }
            return [2 /*return*/];
        }
      });
    });
  };
  return UserDao;
})(base_dao_1.BaseDao);
exports.UserDao = UserDao;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91c2VyL3VzZXIuZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUEyQztBQUMzQyxnREFBMEI7QUFDMUIsc0RBQThCO0FBRTlCO0lBQTZCLDJCQUFPO0lBQXBDOztJQStmQSxDQUFDO0lBOWZPLDBCQUFRLEdBQWQsVUFBZSxFQUE4RTtZQUE1RSxjQUFJLEVBQUUsc0JBQVEsRUFBRSxzQkFBUSxFQUFFLGdCQUFLLEVBQUUsc0JBQVEsRUFBRSxzQkFBUSxFQUFFLDBCQUFVLEVBQUUsd0JBQVM7Ozs7Ozs2QkFDckYsQ0FBQSxRQUFRLEtBQUssU0FBUyxDQUFBLEVBQXRCLHdCQUFzQjt3QkFDeEIscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FDZCw2RUFHSCxFQUNHLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUNsQixFQUFBOzt3QkFORCxTQU1DLENBQUM7Ozs2QkFFQSxDQUFBLFFBQVEsS0FBSyxTQUFTLENBQUEsRUFBdEIsd0JBQXNCO3dCQUN4QixxQkFBTSxJQUFJLENBQUMsS0FBSyxDQUNkLDRGQUdILEVBQ0csQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUMvQixFQUFBOzt3QkFORCxTQU1DLENBQUM7Ozt3QkFFUyxLQUFBLElBQUksQ0FBQyxLQUFLLENBQUE7OEJBQ3JCLHdHQUdEOzhCQUVHLEtBQUs7NEJBQ0wsSUFBSTs0QkFDSixlQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzt3QkFDcEMscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBQTs0QkFUOUIscUJBQU0sU0FBQSxJQUFJO2dDQVNiLFNBQWlDO2dDQUNqQyxRQUFRO2lDQUVYLEVBQUE7NEJBWkQsc0JBQU8sU0FZTixFQUFD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
