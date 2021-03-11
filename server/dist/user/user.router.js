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
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (const p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
const base_router_1 = require('../core/base.router');
const user_service_1 = require('./user.service');
const base_module_1 = require('../core/base.module');
const passport_1 = __importDefault(require('passport'));
const stripe_1 = __importDefault(require('stripe'));
const uuid_1 = require('uuid');
const fs_1 = __importDefault(require('fs'));
const upload = require('express-fileupload');
const express = require('express');
const stripe = new stripe_1.default(
  'sk_test_51HGUvrDOqWcprKpuZu6vskBRg0M6PNsdvQMN0LUyIOuZi97hyNjmLyWfuKgDxiG6s3YKdgaM1a5G70KqIM1Txwpa00OWsn7Ja1',
  {
    apiVersion: '2020-08-27',
  },
);
//import shell from 'shelljs';
const getExtension = function (filename) {
  const i = filename.lastIndexOf('.');
  return i < 0 ? '' : filename.substr(i);
};
const UserRouter = /** @class */ (function (_super) {
  __extends(UserRouter, _super);
  function UserRouter() {
    const _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.service = base_module_1.inject(user_service_1.UserService);
    return _this;
  }
  UserRouter.prototype.registerRoutes = function () {
    const _this = this;
    console.log('user.router.js');
    this.router.get('/getFile/:upload_id', function (req, res) {
      const upload_id = req.params['upload_id'];
      _this.getFile.bind(_this)(__assign(__assign({}, req), { upload_id: upload_id }), res);
    });
    this.router.get('/getFileInfo/', function (req, res) {
      const type = req.query.type;
      const userType = req.query.userType;
      _this.getFileInfo.bind(_this)(
        __assign(__assign({}, req), { type: type, userType: userType }),
        res,
      );
    });
    /*
        this.router.post('/upload', (req: any, res) => {
          const fileName = uuidv4();
          console.log(fileName);
          if (req.files === null) {
            return res.status(400).json({ msg: 'No file uploaded' });
          }
          const file = req.files.file;
          const directoryLocation = `${__dirname}/../../server/uploads/`;
          const location = `${__dirname}/../../server/uploads/${fileName}`;
    
          if (!fs.existsSync(directoryLocation)){
            fs.mkdirSync(directoryLocation);
          }
          // this.saveFileInfo.bind(this)(req, res);
          this.saveFileInfo({...req,fileName}, res);
          file.mv(location, (err) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.json({ filePath: `public/uploads/${file.name}`, status: 'success' });
          });
        });*/
    this.router.post('/studyMaterialUpload', function (req, res) {
      const fileName = uuid_1.v4();
      // console.log(fileName);
      if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
      const directoryLocation = `${__dirname}/../../server/uploads/`;
      const location = `./uploads/${fileName}`;
      if (!fs_1.default.existsSync(directoryLocation)) {
        fs_1.default.mkdirSync(directoryLocation);
      }
      const filesUploaded = req.files.file;
      filesUploaded.mv(location, function (err) {
        if (err) {
          return res.status(500).send(err);
        } else {
          res.send('success');
        }
      });
      const title = req.body.title;
      const teacher_email = req.body.teacher_email;
      const subject = req.body.subject;
      const grade = req.body.grade;
      const description = req.body.description;
      const filenamea = filesUploaded.name;
      const filesize = filesUploaded.size;
      const filemime = filesUploaded.mimetype;
      // this.saveFileInfo({req,fileName}, res);
      //res.send(filemime);
      _this.savestudyMaterialInfo(
        {
          teacher_email: teacher_email,
          subject: subject,
          grade: grade,
          description: description,
          title: title,
          filenamea: filenamea,
          filesize: filesize,
          filemime: filemime,
          fileName: fileName,
        },
        res,
      );
    });
    this.router.post('/signup', this.signupUser.bind(this));
    this.router.post('/login', function (req, res, next) {
      console.log('user/login');
      passport_1.default.authenticate('local', function (err, user, info) {
        if (err) {
          return res.status(400).json('error');
        }
        if (!user) {
          return res.status(400).json('error');
        }
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          res.status(200).json('success');
        });
      })(req, res, next);
    });
    this.router.get('/isauthenticated', this.checkAuthenticated.bind(this));
    this.router.get('/logout', function (req, res) {
      req.logout();
      res.json('success');
    });
    this.router.get('/get-user-information', this.getUserInformation.bind(this));
    this.router.get('/assignments', this.listAssignments.bind(this));
    this.router.get('/completed-assignments', this.listCompletedAssignments.bind(this));
    this.router.get('/get-student-information', this.getStudentInformation.bind(this));
    this.router.post('/filelocation', this.getFileLocation.bind(this));
    this.router.post('/upload-file', this.uploadSubmission.bind(this));
    this.router.get('/get-marks-information', this.getMarksInformation.bind(this));
    this.router.get('/get-grade-information', this.getGrade.bind(this));
    this.router.post('/submitGrading', this.submitGrading.bind(this));
    this.router.get('/getFile2/:upload_id', function (req, res) {
      const upload_id = req.params['upload_id'];
      _this.getFile2.bind(_this)(__assign(__assign({}, req), { upload_id: upload_id }), res);
    });
    this.router.post('/getAssignmentSubmission', function (req, res) {
      const f = req.body.assignment_id;
      //res.json(this.getSubmissionForAssignement(f,res));
      _this.getSubmissionForAssignement(f, res);
    });
    this.router.get('/get-teacher-subjects', this.getTeacherSubject.bind(this));
    this.router.get('/get-available-grades', this.getAvailableGrades.bind(this));
    this.router.get('/get-teacher-assignmets', this.getTeacherAssignmets.bind(this));
    this.router.post('/assingmentsubmit', this.saveAssignment.bind(this));
    this.router.post('/upload', function (req, res) {
      if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
      const file = req.files.file;
      file.mv(`${__dirname}/../../server/uploads/${file.name}`, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      });
    });
    this.router.get('/get-user-subject', this.getUserSubjects.bind(this));
    this.router.get('/get-user-studyMaterial', this.getUserStudyMaterial.bind(this));
    this.router.post('/addSubject', this.addSubject.bind(this));
    this.router.get('/getSubjects', this.getSubjects.bind(this));
    this.router.get('/getGradeSubjects', this.getGradeSubjects.bind(this));
    this.router.post('/addGradeSubjects', this.addGradeSubjects.bind(this));
    this.router.get('/getGrades', this.getGrades.bind(this));
  };
  //////////////////////////////----Student---------/////////
  UserRouter.prototype.uploadSubmission = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let app,
        dt,
        upload_id,
        file,
        mimetype,
        filename,
        temporary,
        fileExtension,
        assignment,
        email,
        dir,
        string,
        _a,
        _b,
        result,
        updated_upload_id,
        _c,
        _d;
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            app = express();
            app.use(upload());
            dt = new Date().getTime();
            upload_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
              const r = (dt + Math.random() * 16) % 16 | 0;
              dt = Math.floor(dt / 16);
              return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
            });
            file = req.files.file;
            mimetype = file.mimetype;
            filename = file.name;
            temporary = filename.split('.');
            fileExtension = temporary[temporary.length - 1];
            filename = `${upload_id}.${fileExtension}`;
            assignment = JSON.parse(req.body.assignment);
            email = req.session.passport.user;
            dir = './../server/uploads/';
            if (!fs_1.default.existsSync(dir)) {
              fs_1.default.mkdirSync(dir);
            }
            file.mv(dir + filename, function (err) {
              if (err) {
                console.log(err);
              }
            });
            _b = (_a = JSON).stringify;
            return [
              4 /*yield*/,
              this.service.writeToUploadsTable(
                upload_id,
                filename,
                file.size,
                fileExtension,
                mimetype,
              ),
            ];
          case 1:
            string = _b.apply(_a, [_e.sent()]);
            result = JSON.parse(string);
            updated_upload_id = result[0].upload_id;
            _d = (_c = res).json;
            return [
              4 /*yield*/,
              this.service.writeToSubmissionTable(
                updated_upload_id,
                assignment.assignment_id,
                email,
              ),
            ];
          case 2:
            return [2 /*return*/, _d.apply(_c, [_e.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.listCompletedAssignments = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let studentInformation, email, _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            return [4 /*yield*/, this.service.getStudentInformation(req.session.passport.user)];
          case 1:
            studentInformation = _c.sent();
            email = studentInformation.email;
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.listCompletedAssignments(email)];
          case 2:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.saveAssignment = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a,
        title,
        due_date,
        description,
        upload_id,
        assignment_id,
        user_email,
        subject_id,
        grade_id,
        upload_date,
        file_name,
        file_type,
        file_size,
        mimetype;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            (_a = req.body),
              (title = _a.title),
              (due_date = _a.due_date),
              (description = _a.description),
              (upload_id = _a.upload_id),
              (assignment_id = _a.assignment_id),
              (user_email = _a.user_email),
              (subject_id = _a.subject_id),
              (grade_id = _a.grade_id),
              (upload_date = _a.upload_date),
              (file_name = _a.file_name),
              (file_type = _a.file_type),
              (file_size = _a.file_size),
              (mimetype = _a.mimetype);
            return [
              4 /*yield*/,
              this.service
                .saveAssignment({
                  title: title,
                  due_date: due_date,
                  description: description,
                  upload_id: upload_id,
                  assignment_id: assignment_id,
                  user_email: user_email,
                  subject_id: subject_id,
                  grade_id: grade_id,
                  upload_date: upload_date,
                  file_name: file_name,
                  file_type: file_type,
                  file_size: file_size,
                  mimetype: mimetype,
                })
                .then(res.json({ msg: 'Assignment Saved!', status: 'success' }))
                .catch(res.json({ msg: 'Not Saved!', status: 'faild' })),
            ];
          case 1:
            _b.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  UserRouter.prototype.listAssignments = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let studentInformation, grade_id, email, _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            return [4 /*yield*/, this.service.getStudentInformation(req.session.passport.user)];
          case 1:
            studentInformation = _c.sent();
            grade_id = studentInformation.grade_id;
            email = studentInformation.email;
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.listAssignments(email, grade_id)];
          case 2:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.getStudentInformation = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getStudentInformation(req.session.passport.user)];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.getFileLocation = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let upload_id, _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            upload_id = req.body.upload_id;
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getFileLocation(upload_id)];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  //////////////--------End Student -------------------------
  UserRouter.prototype.addSubject = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let data;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            data = req.body;
            return [4 /*yield*/, this.service.addSubject(data)];
          case 1:
            _a.sent();
            res.json({ msg: 'Subjects Added!', status: 'success' });
            return [2 /*return*/];
        }
      });
    });
  };
  UserRouter.prototype.getSubjects = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getSubjects()];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.getGrades = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getGrades()];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.addGradeSubjects = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let data;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            data = req.body;
            return [4 /*yield*/, this.service.addGradeSubjects(data)];
          case 1:
            _a.sent();
            res.json({ msg: 'Subjects Added!', status: 'success' });
            return [2 /*return*/];
        }
      });
    });
  };
  UserRouter.prototype.getGradeSubjects = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getGradeSubjects()];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.signupUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a, name, birthday, signInAs, email, password, grade_id, subject_id, telephone;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            (_a = req.body),
              (name = _a.name),
              (birthday = _a.birthday),
              (signInAs = _a.signInAs),
              (email = _a.email),
              (password = _a.password),
              (grade_id = _a.grade_id),
              (subject_id = _a.subject_id),
              (telephone = _a.telephone);
            return [
              4 /*yield*/,
              this.service.saveUser({
                name: name,
                birthday: birthday,
                signInAs: signInAs,
                email: email,
                password: password,
                grade_id: grade_id,
                subject_id: subject_id,
                telephone: telephone,
              }),
            ];
          case 1:
            _b.sent();
            res.json({ msg: 'Sign Up Success!', status: 'success' });
            return [2 /*return*/];
        }
      });
    });
  };
  UserRouter.prototype.saveFileInfo = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let upload_id, file, data;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            upload_id = req.fileName;
            file = req.files.file;
            data = {
              upload_id: upload_id,
              file_name: file.name,
              file_size: `${file.size}KB`,
              file_type: getExtension(file.name),
              upload_date: new Date().toISOString().substring(0, 10),
              mimetype: file.mimetype,
            };
            return [4 /*yield*/, this.service.saveFileInfo(data)];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  UserRouter.prototype.savestudyMaterialInfo = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let upload_id, data, studyData;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            upload_id = req.fileName;
            data = {
              upload_id: upload_id,
              file_name: req.filenamea,
              file_size: `${req.filesize}KB`,
              file_type: getExtension(req.filenamea),
              upload_date: new Date().toISOString().substring(0, 10),
              mimetype: req.filemime,
            };
            studyData = __assign(__assign({}, req), { upload_id: upload_id });
            return [4 /*yield*/, this.service.saveFileInfo(data)];
          case 1:
            _a.sent();
            return [4 /*yield*/, this.service.saveStudyMatInfo(studyData)];
          case 2:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  UserRouter.prototype.checkAuthenticated = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (req.isAuthenticated()) {
          return [2 /*return*/, res.json({ session: true })];
        }
        return [2 /*return*/, res.json({ session: false })];
      });
    });
  };
  UserRouter.prototype.getUserInformation = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getUserInformation(req.session.passport.user)];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  // async getTeacherSubject(req, res) {
  //   return res.json(await this.service.getTeacherSubject(req.session.passport.user));
  // }
  // async getAvailableGrades(req, res){
  //   return res.json(await this.service.getAvailableGrades());
  // }
  UserRouter.prototype.getMarksInformation = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getMarksInformation(req.session.passport.user)];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.getGrade = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getGrade(req.session.passport.user)];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.getFileInfo = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let data, _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            data = { type: req.type, userType: req.userType, user: req.session.passport.user };
            console.log(data.user);
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getFileInfo(data)];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.getFile = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let fileName, location;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.service.getFileName(req.upload_id)];
          case 1:
            fileName = _a.sent();
            location = `${__dirname}/../uploads/${req.upload_id}`;
            return [2 /*return*/, res.download(location, fileName.file_name)];
        }
      });
    });
  };
  UserRouter.prototype.getTeacherSubject = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getTeacherSubject(req.session.passport.user)];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.getTeacherAssignmets = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getTeacherAssignmets(req.session.passport.user)];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.getAvailableGrades = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getAvailableGrades()];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.submitGrading = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let student_email,
        teacher_email,
        assignment_id,
        _a,
        _b,
        _c,
        _d,
        subject_id,
        _e,
        _f,
        _g,
        _h,
        marks,
        comment,
        _j,
        _k;
      return __generator(this, function (_l) {
        switch (_l.label) {
          case 0:
            student_email = req.body.email;
            teacher_email = req.session.passport.user;
            console.log(req.body.upload_id);
            _b = (_a = JSON).parse;
            _d = (_c = JSON).stringify;
            return [4 /*yield*/, this.service.getAssignmentID(req.body.upload_id)];
          case 1:
            return [4 /*yield*/, _b.apply(_a, [_d.apply(_c, [_l.sent()])]).assignment_id];
          case 2:
            assignment_id = _l.sent();
            console.log(assignment_id);
            _f = (_e = JSON).parse;
            _h = (_g = JSON).stringify;
            return [4 /*yield*/, this.service.getSubjectID(assignment_id)];
          case 3:
            return [4 /*yield*/, _f.apply(_e, [_h.apply(_g, [_l.sent()])]).subject_id];
          case 4:
            subject_id = _l.sent();
            console.log(subject_id);
            marks = req.body.grade;
            comment = req.body.comment;
            _k = (_j = res).json;
            return [
              4 /*yield*/,
              this.service.writeToMarksTable(
                student_email,
                teacher_email,
                assignment_id,
                subject_id,
                marks,
                comment,
              ),
            ];
          case 5:
            return [2 /*return*/, _k.apply(_j, [_l.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.getFile2 = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let fileName, file, location;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.service.getFileName(req.upload_id)];
          case 1:
            fileName = _a.sent();
            file = JSON.parse(JSON.stringify(fileName)).file_name;
            console.log(file);
            location = `${__dirname}/../uploads/${file}`;
            console.log(location);
            res.download(location);
            return [2 /*return*/];
        }
      });
    });
  };
  UserRouter.prototype.getUserSubjects = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getUserSubjects(req.session.passport.user)];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  UserRouter.prototype.getUserStudyMaterial = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getUserStudyMaterial(req.session.passport.user)];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  //
  UserRouter.prototype.getSubmissionForAssignement = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      let _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, this.service.getSubmissionForAssignement(req)];
          case 1:
            return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
      });
    });
  };
  return UserRouter;
})(base_router_1.BaseRouter);
exports.UserRouter = UserRouter;
module.exports.getExtension = getExtension;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91c2VyL3VzZXIucm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQWlEO0FBQ2pELCtDQUE2QztBQUM3QyxtREFBNkM7QUFDN0Msc0RBQWdDO0FBQ2hDLGtEQUE0QjtBQUM1Qiw2QkFBb0M7QUFDcEMsMENBQW9CO0FBQ3BCLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzdDLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVuQyxJQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQ3ZCLDZHQUE2RyxFQUM3RztJQUNFLFVBQVUsRUFBRSxZQUFZO0NBQ3pCLENBQ0YsQ0FBQztBQUNGLDhCQUE4QjtBQUM5QixJQUFNLFlBQVksR0FBRyxVQUFDLFFBQVE7SUFDNUIsSUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUM7QUFDRjtJQUFnQyw4QkFBVTtJQUExQztRQUFBLHFFQXlhQztRQXhhQyxhQUFPLEdBQUcsb0JBQU0sQ0FBQywwQkFBVyxDQUFDLENBQUM7O0lBd2FoQyxDQUFDO0lBdmFDLG1DQUFjLEdBQWQ7UUFBQSxpQkFnS0M7UUEvSkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLFVBQUMsR0FBUSxFQUFFLEdBQUc7WUFDbkQs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
