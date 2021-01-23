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
