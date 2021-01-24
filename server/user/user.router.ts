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
//import shell from 'shelljs';
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

    this.router.post('/studyMaterialUpload', (req: any, res) => {
      const fileName = uuidv4();
     // console.log(fileName);
      if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }

     const directoryLocation = `${__dirname}/../../server/uploads/`;
      const location = `./uploads/${fileName}`;

      if (!fs.existsSync(directoryLocation)){
        fs.mkdirSync(directoryLocation);
      }
      const filesUploaded = req.files.file;
        filesUploaded.mv(location, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        else{ res.send("success");}
      });
      
      const title=req.body.title;
      const teacher_email=req.body.teacher_email;
      const subject=req.body.subject;
      const grade=req.body.grade;
      const description=req.body.description;
      const filenamea = filesUploaded.name;
      const filesize = filesUploaded.size;
      const filemime = filesUploaded.mimetype;
      // this.saveFileInfo({req,fileName}, res);
      //res.send(filemime);
      this.savestudyMaterialInfo({teacher_email,subject,grade,description,title,filenamea,filesize,filemime,fileName}, res);
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
     this.router.get('/get-user-subject', this.getUserSubjects.bind(this));
      this.router.get('/get-user-studyMaterial', this.getUserStudyMaterial.bind(this));
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

  async savestudyMaterialInfo(req, res) {
    const upload_id = req.fileName;
    const data = {upload_id: upload_id, file_name: req.filenamea, file_size: `${req.filesize}KB`, file_type: getExtension(req.filenamea), upload_date:new Date().toISOString().substring(0, 10), mimetype: req.filemime};
    const studyData = {...req,upload_id};
    await this.service.saveFileInfo(data);
    await this.service.saveStudyMatInfo(studyData);
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
  async getUserSubjects(req, res) {
    return res.json(await this.service.getUserSubjects(req.session.passport.user));
  }
  async getUserStudyMaterial(req, res) {
    return res.json(await this.service.getUserStudyMaterial(req.session.passport.user));
  }
//  
}
