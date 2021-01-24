import { BaseDao } from '@core/base.dao';
import dayjs from 'dayjs';
import bcrypt from 'bcryptjs';

export class UserDao extends BaseDao {
  async saveUser({ name, birthday, signInAs, email, password, grade, subject, telephone }) {
      if (signInAs === 'student'){
          await this.query(
              `
        INSERT INTO student (email,grade)
        VALUES (?, ?)
    `,
              [email,grade],
          );
      }
      if (signInAs === 'teacher'){
          await this.query(
              `
        INSERT INTO teacher (email,subject,telephone)
        VALUES (?, ?, ?)
    `,
              [email,subject,telephone],
          );
      }
    return await this.query(
      `
        INSERT INTO user (email,name,birthday, password, type)
        VALUES (?, ?, ?, ?, ?)
    `,
      [
          email,
        name,
        dayjs(birthday).format('YYYY-MM-DD'),
        await this.hashPassword(password),
          signInAs,

      ],
    );
  }
  async saveFileInfo(data) {
    return await this.query(
      `
        INSERT INTO upload (upload_id, file_name, file_size, file_type, upload_date, mimetype)
        VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
          data.upload_id,
          data.file_name,
          data.file_size,
          data.file_type,
          data.upload_date,
          data.mimetype,
      ],
    );
  }
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async getUser(email) {
    const rows = await this.query(
      `
    SELECT * FROM user WHERE email=?
    `,
      [email],
    );
    return rows[0];
  };
  async getFileName(upload_id) {
    const fileName= await this.query(
      `
    SELECT file_name FROM upload WHERE upload_id= ?;
    `, [upload_id]
    );
    return fileName[0];
  };

  async getFileInfo(data) {
      const type = data.type;
      const userType = data.userType;
      const user = data.user;
      let getData;
      let userGrade;
      let userSubject;
      if(userType === 'student'){
           userGrade = await this.query(
              `
    SELECT grade FROM student where email= ?;
    `, [user]
          );
      };
      if(userType === 'teacher'){
          userSubject = await this.query(
              `
    SELECT subject_id FROM teacher where email= ?;
    `, [user]
          );
      };
      if(type === 'assignment' && userType === 'student') {
           getData= await this.query(
              `
    SELECT * FROM assignment where grade= ?;
    `, [userGrade]
          );
      } else if(type === 'assignment' && userType === 'teacher') {
          getData= await this.query(
              `
        SELECT * FROM assignment where user_email= ?;
        `, [user]
          );
      }else if(type === 'submission' && userType === 'student') {
          getData= await this.query(
              `
    SELECT * FROM submission where user_email= ?;
    `, [user]
          );
      }else if(type === 'submission' && userType === 'teacher') {
          getData= await this.query(
              `
    SELECT * FROM submission where grade= ?;;
        `, [userSubject]
          );
      }else if(type === 'study_material' && userType === 'student') {
          getData= await this.query(
              `
    SELECT * FROM study_material where grade= ?;
    `, [userGrade]
          );
      }else if(type === 'study_material' && userType === 'teacher') {
          getData= await this.query(
              `
    SELECT * FROM study_material where user_email= ?;
        `, [user]
          );
      }
    if (getData[0] === undefined) {
        return getData
    }else {
        return getData[0]
    }


  };

  async getUserInformation(email) {
    const rows = await this.query(
      `
    SELECT * FROM user WHERE email=?
    `,
      [email],
    );

    return rows[0];
  }

  async getUserSubjects(email) {
    const rows = await this.query(
      `
   SELECT * FROM eLearning.user WHERE email=?
    `,
      [email],
    );

    const usertype = rows[0].type;
    let subjects=[];
    if(usertype=="student"){
      subjects = await this.query(
      `
      SELECT subject_id,subject FROM grade_subject INNER JOIN subject USING(subject_id) WHERE grade_id = (SELECT grade_id FROM student WHERE email=?)
    `,
      [email],
    );
     const grade = await this.query(
      `SELECT grade_id,grade FROM student INNER JOIN grade USING(grade_id) WHERE student.email=?`,
      [email],
     ) ;  
     subjects.push(grade[0]);
    
    }
    else if(usertype=="teacher"){
      const subjectTeacher = await this.query(
      `
      SELECT subject_id,subject FROM teacher INNER JOIN subject USING(subject_id) WHERE teacher.email=?
    `,
      [email],
    );
    subjects = await this.query(
      `
      SELECT grade_id,grade FROM grade;
    `
    );
      subjects.push(subjectTeacher);
    }
    return subjects;
  }

  async getUserStudyMaterial(email) {
    const rows = await this.query(
      `
   SELECT * FROM eLearning.user WHERE email=?
    `,
      [email],
    );

    const usertype = rows[0].type;
    let study=[];
    if(usertype=="student"){
      study = await this.query(
      `
       SELECT sm.titile,s.subject,s.subject_id ,u.name,sm.description,upload_id,upload_date FROM ((study_material sm INNER JOIN user u ON sm.teacher_email=u.email) INNER JOIN subject s USING(subject_id)) INNER JOIN upload USING(upload_id) WHERE grade_id=(SELECT grade_id FROM student WHERE email=?) ORDER BY study_material_id DESC;
    `,
      [email],
    );
    
    }
    else if(usertype=="teacher"){
      study = await this.query(
      `
      SELECT upload_id,subject,grade,description,titile,upload_date FROM study_material INNER JOIN subject USING(subject_id) INNER JOIN grade USING(grade_id) INNER JOIN upload using(upload_id) WHERE teacher_email=? ORDER BY study_material_id DESC;
    `,
      [email],
    );
    }
    return study;
  }

  async saveStudyMatInfo(data) {
    return await this.query(
      `
        INSERT INTO study_material (upload_id, teacher_email, subject_id, grade_id, description, titile)
        VALUES (?, ?, ?, ?, ?,?)
    `,
      [
          data.upload_id,
          data.teacher_email,
          data.subject,
          data.grade,
          data.description,
          data.title,
      ],
    );
  }

}
