import { BaseRouter } from '@core/base.router';
import { UserService } from './user.service';
import { inject } from '@core/base.module';
import passport from 'passport';
import Stripe from 'stripe';
const upload = require('express-fileupload');
const express = require('express');
const fs= require('fs');

const stripe = new Stripe(
  'sk_test_51HGUvrDOqWcprKpuZu6vskBRg0M6PNsdvQMN0LUyIOuZi97hyNjmLyWfuKgDxiG6s3YKdgaM1a5G70KqIM1Txwpa00OWsn7Ja1',
  {
    apiVersion: '2020-08-27',
  },
);
export class UserRouter extends BaseRouter {
  service = inject(UserService);
  registerRoutes() {
    console.log("user.router.js");
    this.router.post('/upload', (req: any, res) => {
      if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
      console.log(req);
      this.saveFileInfo.bind(this);
      const file = req.files.file;
      file.mv(`${__dirname}/../../public/uploads/${file.name}`, (err) => {
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
          console.log("user/login");
          passport.authenticate('local', function(err, user, info) {
            if (err) { return res.json('error');; }
            if (!user) { return res.json('error');; }
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
    this.router.get('/assignments',this.listAssignments.bind(this));
    this.router.get('/completed-assignments',this.listCompletedAssignments.bind(this));

    this.router.get('/get-student-information',this.getStudentInformation.bind(this));


    this.router.post('/filelocation',this.getFileLocation.bind(this));

    this.router.post('/upload-file',this.uploadSubmission.bind(this));


  }
  //////////////////////////////----Student---------/////////

  async uploadSubmission(req,res){
    const app = express();
    app.use(upload());
    let dt = new Date().getTime();
    let upload_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    // const maxUploadID = await this.service.getLastUploadID();
    // const nextUploadID = parseInt(maxUploadID.AUTO_INCREMENT);

    let file = req.files.file;
    let mimetype = file.mimetype;
    let filename = file.name;
    let temporary = filename.split(".");
    let fileExtension = temporary[temporary.length-1];
    filename = upload_id+'.'+fileExtension;
    let assignment = JSON.parse(req.body.assignment);
    let email = req.session.passport.user;

    var dir = './../server/uploads/';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    file.mv(dir+filename,function(err){
      if(err){
        console.log(err);
      }
    }   );

    let string = JSON.stringify( await this.service.writeToUploadsTable(upload_id,filename,file.size,fileExtension,mimetype));
    let result = JSON.parse(string);
    let updated_upload_id = result[0].upload_id;
    return res.json(await this.service.writeToSubmissionTable(updated_upload_id,assignment.assignment_id,email));
     
 

  }
  async listCompletedAssignments(req,res){
    const studentInformation =await this.service.getStudentInformation(req.session.passport.user);
    const email = studentInformation.email;
    return res.json(await this.service.listCompletedAssignments(email));

  }

  async listAssignments(req,res){
    const studentInformation =await this.service.getStudentInformation(req.session.passport.user);
    const grade_id = studentInformation.grade_id;
    const email = studentInformation.email;
    return res.json(await this.service.listAssignments(email,grade_id));
  }

  async getStudentInformation(req,res){
    return res.json(await this.service.getStudentInformation(req.session.passport.user));
  }

  async getFileLocation(req,res){
    const {upload_id} =req.body;
    return res.json(await this.service.getFileLocation(upload_id));
  }





//////////////--------End Student -------------------------




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
    const data =  [1003, 'designPatterns.docx', 'translated', 1005] ;
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

  


}
