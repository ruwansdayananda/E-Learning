import { BaseDao } from '@core/base.dao';
import dayjs from 'dayjs';
import bcrypt from 'bcryptjs';

export class UserDao extends BaseDao {
  async saveUser({ name, birthday, signInAs, email, password, grade, subject, telephone }) {
    if (signInAs === 'student') {
      await this.query(
        `
        INSERT INTO student (email,grade_id)
        VALUES (?, ?)
    `,
        [email, 2],
      );
    }
    if (signInAs === 'teacher') {
      await this.query(
        `
        INSERT INTO teacher (email,subject_id,telephone)
        VALUES (?, ?, ?)
    `,
        [email, 1, telephone],
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

  async saveAssignment({ title, due_date, description, upload_id, assignment_id, user_email, subject_id, grade_id, upload_date, file_name, file_type, file_size, mimetype }) {
    
    if(upload_id !=''){
    await this.query(
      `
          INSERT INTO upload ( upload_id, file_name, file_size, file_type, upload_date, mimetype)
          VALUES (?, ?, ?, ?, ?,?)
      `,
      [
        upload_id, file_name, file_size, file_type, dayjs(upload_date).format('YYYY-MM-DD'), mimetype

      ],
    );}else{
      upload_id = null;
    }
    return await this.query(
      `
        INSERT INTO assignment (assignment_id, upload_id, user_email, subject_id, grade_id, due_date, title, description, upload_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        assignment_id, upload_id, user_email, subject_id, grade_id, due_date, title, description, dayjs(upload_date).format('YYYY-MM-DD')

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
////////////////////////////////////////////////////////////////////////////
async listAssignments(email,grade_id){
  const rows =  await this.query(`
  SELECT assignment_id,upload_id,user_email,subject,grade_id,due_date,title,description,upload_date 
  FROM subject as s NATURAL JOIN (SELECT * from assignment where (grade_id=?) AND (due_date>now()) AND ? NOT IN(SELECT email FROM elearning.submission WHERE assignment.assignment_id=submission.assignment_id)) as d
  ORDER BY due_date ASC;`,[grade_id,email]);
  return rows;
}

async listCompletedAssignments(email){
  const rows =  await this.query(`SELECT assignment_id,upload_id,user_email,subject,grade_id,due_date,title,description,upload_date
   FROM subject as s NATURAL JOIN 
   (SELECT * from assignment where ? IN(SELECT email FROM elearning.submission WHERE assignment.assignment_id=submission.assignment_id)) as d
   ORDER BY due_date DESC LIMIT 15;`,[email]);
  return rows;
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

  async getStudentInformation(email){
    const rows = await this.query(
      `SELECT * FROM eLearning.student WHERE email = ? `,[email]
    );
    return rows[0];
  }

  async getFileLocation(upload_id){
    const rows = await this.query(`
    SELECT * FROM eLearning.uploads WHERE upload_id = ?
    `,[upload_id]
    );
    return rows[0];
  }

  async writeToUploadsTable(upload_id,filename,file_size,fileExtension,mimetype){
    await this.query(
      `INSERT INTO upload (upload_id,file_name, file_size, file_type,upload_date,mimetype)
      VALUES (?,?,?,?,CURDATE(),?);
      `,
      [upload_id,filename,file_size,fileExtension,mimetype]
    );
    return await this.query(
      `SELECT upload_id FROM eLearning.upload WHERE file_name=?`,[filename]
    );

  }

  async writeToSubmissionTable(updated_upload_id,assignment_id,email){
    await this.query(
      `INSERT INTO submission (upload_id,assignment_id,email)
      VALUES (?,?,?);
      `,
      [updated_upload_id,assignment_id,email]
    );
  }


  async getLastUploadID(){
    const rows = await this.query(
      `SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name='uploads' AND table_schema=DATABASE() ;`
    );
    return rows[0];
  }


  async getTeacherSubject(email) {
    const rows = await this.query(
      `
      SELECT * from eLearning.teacher natural join eLearning.subject WHERE email=?
    
    `,
      [email],

    );

    return rows[0];
  }

  async getAvailableGrades() {
    const rows = await this.query(
      `
      SELECT * from eLearning.grade
    
    `

    );

    return rows;
  }



}
