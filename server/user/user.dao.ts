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
  async saveFileInfo({ order_number, document_name, document_status, client_id }) {

    return await this.query(
      `
        INSERT INTO document_details (order_number, document_name, document_status, client_id)
        VALUES (?, ?, ?, ?)
    `,
      [
          order_number,
          document_name,
          document_status,
          client_id,
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
    SELECT * FROM eLearning.user WHERE email=?
    `,
      [email],
    );
    return rows[0];
  }
  async getUserInformation(email) {
    const rows = await this.query(
      `
    SELECT * FROM eLearning.user WHERE email=?
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

}
