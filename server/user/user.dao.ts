import { BaseDao } from '@core/base.dao';
import dayjs from 'dayjs';
import bcrypt from 'bcryptjs';

export class UserDao extends BaseDao {
  async saveUser({ name, birthday, signInAs, email, password, grade, subject, telephone }) {
      if (signInAs === 'student'){
          await this.query(
              `
        INSERT INTO student (email,grade_id)
        VALUES (?, ?)
    `,
              [email,6],
          );
      }
      if (signInAs === 'teacher'){
          await this.query(
              `
        INSERT INTO teacher (email,subject_id,telephone)
        VALUES (?, ?, ?)
    `,
              [email,1,telephone],
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

  async getMarksInformation(email) {
    const rows = await this.query(
      `
      SELECT * FROM mark WHERE student_email=?
    `,
      [email],
    );
    return rows[0];
  };

  async getGrade(email) {
    const rows = await this.query(
      `
      SELECT * FROM grade WHERE grade_id = (SELECT grade_id FROM student WHERE email=?)
    `,
      [email],
    );
    return rows[0];
  };

  async getStudentGPA(email) {
    const rows = await this.query(
      `
      SELECT * FROM student_performance WHERE student_email=?
    `,
      [email],
    );
    return rows[0];
  };

  async getTeacherSubject(email) {
    const rows = await this.query(
      `
      SELECT * from eLearning.teacher natural join eLearning.subject WHERE email=?
    
    `,
      [email],

    );

    return rows[0];
  }

  async getTeacherAssignmets(email) {
    const rows = await this.query(
      `
      SELECT * from eLearning.assignment WHERE user_email=? ORDER BY upload_date desc
    
    `,
      [email],

    );

    return rows;
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