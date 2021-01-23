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


}
