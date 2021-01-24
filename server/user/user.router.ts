import { BaseRouter } from '@core/base.router';
import { UserService } from './user.service';
import { inject } from '@core/base.module';
import passport from 'passport';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe(
  'sk_test_51HGUvrDOqWcprKpuZu6vskBRg0M6PNsdvQMN0LUyIOuZi97hyNjmLyWfuKgDxiG6s3YKdgaM1a5G70KqIM1Txwpa00OWsn7Ja1',
  {
    apiVersion: '2020-08-27',
  },
);
import fs from 'fs';
import shell from 'shelljs';
function getExtension(filename) {
  const i = filename.lastIndexOf('.');
  return i < 0 ? '' : filename.substr(i);
}
export class UserRouter extends BaseRouter {
  service = inject(UserService);
  registerRoutes() {
    this.router.get('/getFile/:upload_id', (req: any, res) => {
      const upload_id = req.params['upload_id'];
      this.getFile.bind(this)({...req,upload_id},res)
    });
    this.router.get('/getFileInfo/', (req: any, res) => {
      const type = req.query.type;
      const userType = req.query.userType;
      this.getFileInfo.bind(this)({...req,type, userType},res)
    });
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
        res.json({ filePath: `/uploads/${file.name}`, status: 'success' });
      });
    });
    this.router.post('/signup', this.signupUser.bind(this));
    this.router.post(
      '/login',
        function(req, res, next) {
          passport.authenticate('local', function(err, user, info) {
            if (err) { return res.json('error'); }
            if (!user) { return res.json('error'); }
            req.logIn(user, function(err) {
              if (err) { return next(err); }
              res.json('success');
            });
          })(req, res, next);
        }
    );
    this.router.get('/isauthenticated', this.checkAuthenticated.bind(this));
    this.router.get('/logout', function (req, res) {
      req.logout();
      res.json('success');
    });
    this.router.get('/get-user-information', this.getUserInformation.bind(this));
    this.router.get('/get-marks-information', this.getMarksInformation.bind(this));
    this.router.get('/get-grade-information', this.getGrade.bind(this));
    this.router.get('/get-gpa-information', this.getStudentGPA.bind(this));
    this.router.post('/submitGrading',this.submitGrading.bind(this));
    this.router.get('/getFile2/:upload_id', (req: any, res) => {
      const upload_id = req.params['upload_id'];
      this.getFile2.bind(this)({...req,upload_id},res);
    });
    this.router.post('/getAssignmentSubmission', (req: any, res) => {
      const f = req.body.assignment_id
     //res.json(this.getSubmissionForAssignement(f,res));
     this.getSubmissionForAssignement(f,res)
    });
    this.router.get('/get-teacher-subjects', this.getTeacherSubject.bind(this));

    this.router.get('/get-available-grades', this.getAvailableGrades.bind(this));

    this.router.get('/get-teacher-assignmets', this.getTeacherAssignmets.bind(this));
  }

  async signupUser(req, res) {
    const { name, birthday, signInAs, email, password, grade, subject, telephone } = req.body;
    await this.service.saveUser({
      name,
      birthday,
      signInAs,
      email,
      password,
      grade,
      subject,
      telephone,
    });
    res.json({ msg: 'Sign Up Success!', status: 'success' });
  }

  async saveFileInfo(req, res) {
    const upload_id = req.fileName;
    const file = req.files.file;
    const data = {upload_id:upload_id, file_name: file.name, file_size: `${file.size}KB`, file_type: getExtension(file.name), upload_date:new Date().toISOString().substring(0, 10), mimetype: file.mimetype}
    await this.service.saveFileInfo(data);
  }

  async checkAuthenticated(req, res) {
    if (req.isAuthenticated()) {
      return res.json({ session: true });
    }
    return res.json({ session: false });
  }
  async getUserInformation(req, res) {
    return res.json(await this.service.getUserInformation(req.session.passport.user));
  }
  async getMarksInformation(req, res) {
    return res.json(await this.service.getMarksInformation(req.session.passport.user));
  }
  async getGrade(req, res) {
    return res.json(await this.service.getGrade(req.session.passport.user));
  }
  async getStudentGPA(req, res) {
    return res.json(await this.service.getStudentGPA(req.session.passport.user));
  }
  async getFileInfo(req, res) {
    const data = {type: req.type,userType: req.userType, user: req.session.passport.user};
    console.log(data.user);
    return res.json(await this.service.getFileInfo(data));
  }
  async getFile(req, res) {
    const fileName = await this.service.getFileName(req.upload_id);
    const location = `${__dirname}/../uploads/${req.upload_id}`;
    return res.download(location, fileName.file_name);
  }

  async getTeacherSubject(req, res) {
  
    return res.json(await this.service.getTeacherSubject(req.session.passport.user));
  }

  async getTeacherAssignmets(req, res){
    return res.json(await this.service.getTeacherAssignmets(req.session.passport.user))
  }

  async getAvailableGrades(req, res){
    return res.json(await this.service.getAvailableGrades());
  }


  async submitGrading(req,res){
    let student_email = req.body.email;
    let teacher_email = req.session.passport.user;
    console.log(req.body.upload_id);
    let assignment_id =await JSON.parse(JSON.stringify(await this.service.getAssignmentID(req.body.upload_id))).assignment_id;
    console.log(assignment_id);
    let subject_id = await JSON.parse(JSON.stringify(await this.service.getSubjectID(assignment_id))).subject_id;
    console.log(subject_id);
    let marks = req.body.grade;
    let comment = req.body.comment;
    return res.json(await this.service.writeToMarksTable(student_email,teacher_email,assignment_id,subject_id,marks,comment));
    
  }

  async getFile2(req, res) {
    const fileName = await this.service.getFileName(req.upload_id);
    const file = JSON.parse(JSON.stringify(fileName)).file_name;
    console.log(file);
    const location = `${__dirname}/../uploads/${file}`;
    console.log(location);
    res.download(location);
  }

  async getSubmissionForAssignement(req, res) {

    return res.json(await this.service.getSubmissionForAssignement(req));
  }


}
