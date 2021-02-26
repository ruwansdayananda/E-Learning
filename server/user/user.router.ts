import { BaseRouter } from '@core/base.router';
import { UserService } from './user.service';
import { inject } from '@core/base.module';
import passport from 'passport';
import Stripe from 'stripe';
const upload = require('express-fileupload');
const express = require('express');
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
    console.log("user.router.js");
    this.router.get('/getFile/:upload_id', (req: any, res) => {
      const upload_id = req.params['upload_id'];
      this.getFile.bind(this)({...req,upload_id},res);
    });
    this.router.get('/getFileInfo/', (req: any, res) => {
      const type = req.query.type;
      const userType = req.query.userType;
      this.getFileInfo.bind(this)({...req,type, userType},res)
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
          console.log("user/login");
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
    this.router.get('/assignments',this.listAssignments.bind(this));
    this.router.get('/completed-assignments',this.listCompletedAssignments.bind(this));

    this.router.get('/get-student-information',this.getStudentInformation.bind(this));


    this.router.post('/filelocation',this.getFileLocation.bind(this));

    this.router.post('/upload-file',this.uploadSubmission.bind(this));
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

    this.router.post('/assingmentsubmit', this.saveAssignment.bind(this));

    this.router.post('/upload' , (req :any, res)=>{
      if(req.files ===null){
          return res.status(400).json({msg: 'No file uploaded'})
  
      }
      
      const file = req.files.file;
     
      file.mv(`${__dirname}/../../server/uploads/${file.name}` , err=>{
          if(err){
              console.log(err)
              return res.status(500).send(err)
          }
  
          res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
  
      })
  
  
  })
  this.router.get('/get-user-subject', this.getUserSubjects.bind(this));
  this.router.get('/get-user-studyMaterial', this.getUserStudyMaterial.bind(this));
  
  this.router.post('/addSubject', this.addSubject.bind(this));
    this.router.get('/getSubjects', this.getSubjects.bind(this));
    this.router.get('/getGradeSubjects', this.getGradeSubjects.bind(this));
    this.router.post('/addGradeSubjects', this.addGradeSubjects.bind(this));
    this.router.get('/getGrades', this.getGrades.bind(this));


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
  
  async saveAssignment(req , res){
    const {title, due_date, description, upload_id, assignment_id, user_email, subject_id, grade_id, upload_date, file_name, file_type, file_size, mimetype} = req.body;
    await this.service.saveAssignment({title, due_date, description, upload_id, assignment_id, user_email, subject_id, grade_id, upload_date, file_name, file_type, file_size, mimetype}).then(
      res.json({ msg: 'Assignment Saved!', status: 'success' })
    ).catch(
      res.json({ msg: 'Not Saved!', status: 'faild' })
    )
    
  
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
async addSubject(req, res) {
  const data = req.body;
  await this.service.addSubject(data)
  res.json({ msg: 'Subjects Added!', status: 'success' });
}
async getSubjects(req, res) {
  return res.json(await this.service.getSubjects());
}
async getGrades(req, res) {
  return res.json(await this.service.getGrades());
}
async addGradeSubjects(req, res) {
  const data = req.body;
  await this.service.addGradeSubjects(data)
  res.json({ msg: 'Subjects Added!', status: 'success' });
}
async getGradeSubjects(req, res) {
  return res.json(await this.service.getGradeSubjects());
}



  async signupUser(req, res) {
    const { name, birthday, signInAs, email, password, grade_id, subject_id, telephone } = req.body;
    await this.service.saveUser({
      name,
      birthday,
      signInAs,
      email,
      password,
      grade_id,
      subject_id,
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
  // async getTeacherSubject(req, res) {
  
  //   return res.json(await this.service.getTeacherSubject(req.session.passport.user));
  // }

  // async getAvailableGrades(req, res){
  //   return res.json(await this.service.getAvailableGrades());
  // }

  


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
  async getUserSubjects(req, res) {
    return res.json(await this.service.getUserSubjects(req.session.passport.user));
  }
  async getUserStudyMaterial(req, res) {
    return res.json(await this.service.getUserStudyMaterial(req.session.passport.user));
  }
//  

  async getSubmissionForAssignement(req, res) {

    return res.json(await this.service.getSubmissionForAssignement(req));
  }


}
