import { BaseDao } from '../core/base.dao';
import dayjs from 'dayjs';
import bcrypt from 'bcryptjs';

export class UserDao extends BaseDao {
  async saveUser({ name, birthday, signInAs, email, password, grade_id, subject_id, telephone }) {
    if (signInAs === 'student') {
      await this.query(
        `
        INSERT INTO student (email,grade_id)
        VALUES (?, ?)
    `,
        [email, grade_id],
      );
    }
    if (signInAs === 'teacher') {
      await this.query(
        `
        INSERT INTO teacher (email,subject_id,telephone)
        VALUES (?, ?, ?)
    `,
        [email, subject_id, telephone],
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

  async saveAssignment({
    title,
    due_date,
    description,
    upload_id,
    assignment_id,
    user_email,
    subject_id,
    grade_id,
    upload_date,
    file_name,
    file_type,
    file_size,
    mimetype,
  }) {
    if (upload_id != '') {
      await this.query(
        `
          INSERT INTO upload ( upload_id, file_name, file_size, file_type, upload_date, mimetype)
          VALUES (?, ?, ?, ?, ?,?)
      `,
        [
          upload_id,
          file_name,
          file_size,
          file_type,
          dayjs(upload_date).format('YYYY-MM-DD'),
          mimetype,
        ],
      );
    } else {
      upload_id = null;
    }
    return await this.query(
      `
        INSERT INTO assignment (assignment_id, upload_id, user_email, subject_id, grade_id, due_date, title, description, upload_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        assignment_id,
        upload_id,
        user_email,
        subject_id,
        grade_id,
        due_date,
        title,
        description,
        dayjs(upload_date).format('YYYY-MM-DD'),
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
  async listAssignments(email, grade_id) {
    const rows = await this.query(
      `
  SELECT assignment_id,upload_id,user_email,subject,grade_id,due_date,title,description,upload_date 
  FROM subject as s NATURAL JOIN (SELECT * from assignment where (grade_id=?) AND (due_date>now()) AND ? NOT IN(SELECT email FROM submission WHERE assignment.assignment_id=submission.assignment_id)) as d
  ORDER BY due_date ASC;`,
      [grade_id, email],
    );
    return rows;
  }

  async listCompletedAssignments(email) {
    const rows = await this.query(
      `SELECT assignment_id,upload_id,user_email,subject,grade_id,due_date,title,description,upload_date
   FROM subject as s NATURAL JOIN 
   (SELECT * from assignment where ? IN(SELECT email FROM submission WHERE assignment.assignment_id=submission.assignment_id)) as d
   ORDER BY due_date DESC LIMIT 15;`,
      [email],
    );
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
  }
  async getFileName(upload_id) {
    const fileName = await this.query(
      `
    SELECT file_name FROM upload WHERE upload_id= ?;
    `,
      [upload_id],
    );
    return fileName[0];
  }

  async getFileInfo(data) {
    const type = data.type;
    const userType = data.userType;
    const user = data.user;
    let getData;
    let userGrade;
    let userSubject;
    if (userType === 'student') {
      userGrade = await this.query(
        `
    SELECT grade FROM student where email= ?;
    `,
        [user],
      );
    }
    if (userType === 'teacher') {
      userSubject = await this.query(
        `
    SELECT subject_id FROM teacher where email= ?;
    `,
        [user],
      );
    }
    if (type === 'assignment' && userType === 'student') {
      getData = await this.query(
        `
    SELECT * FROM assignment where grade= ?;
    `,
        [userGrade],
      );
    } else if (type === 'assignment' && userType === 'teacher') {
      getData = await this.query(
        `
        SELECT * FROM assignment where user_email= ?;
        `,
        [user],
      );
    } else if (type === 'submission' && userType === 'student') {
      getData = await this.query(
        `
    SELECT * FROM submission where user_email= ?;
    `,
        [user],
      );
    } else if (type === 'submission' && userType === 'teacher') {
      getData = await this.query(
        `
    SELECT * FROM submission where grade= ?;;
        `,
        [userSubject],
      );
    } else if (type === 'study_material' && userType === 'student') {
      getData = await this.query(
        `
    SELECT * FROM study_material where grade= ?;
    `,
        [userGrade],
      );
    } else if (type === 'study_material' && userType === 'teacher') {
      getData = await this.query(
        `
    SELECT * FROM study_material where user_email= ?;
        `,
        [user],
      );
    }
    if (getData[0] === undefined) {
      return getData;
    } else {
      return getData[0];
    }
  }

  async getUserInformation(email) {
    const rows = await this.query(
      `
    SELECT * FROM user WHERE email=?
    `,
      [email],
    );

    return rows[0];
  }

  async getStudentInformation(email) {
    const rows = await this.query(`SELECT * FROM student WHERE email = ? `, [email]);
    return rows[0];
  }

  async getFileLocation(upload_id) {
    const rows = await this.query(
      `
    SELECT * FROM uploads WHERE upload_id = ?
    `,
      [upload_id],
    );
    return rows[0];
  }

  async writeToUploadsTable(upload_id, filename, file_size, fileExtension, mimetype) {
    await this.query(
      `INSERT INTO upload (upload_id,file_name, file_size, file_type,upload_date,mimetype)
      VALUES (?,?,?,?,CURDATE(),?);
      `,
      [upload_id, filename, file_size, fileExtension, mimetype],
    );
    return await this.query(`SELECT upload_id FROM upload WHERE file_name=?`, [filename]);
  }

  async writeToSubmissionTable(updated_upload_id, assignment_id, email) {
    await this.query(
      `INSERT INTO submission (upload_id,assignment_id,email)
      VALUES (?,?,?);
      `,
      [updated_upload_id, assignment_id, email],
    );
  }

  async getLastUploadID() {
    const rows = await this.query(
      `SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name='uploads' AND table_schema=DATABASE() ;`,
    );
    return rows[0];
  }

  async getMarksInformation(email) {
    const rows = await this.query(
      `
      SELECT title,marks,teacher_email,subject.subject FROM mark LEFT OUTER JOIN (assignment left outer join subject on assignment.subject_id=subject.subject_id) ON mark.assignment_id=assignment.assignment_id  WHERE student_email=?
    `,
      [email],
    );
    return rows;
  }

  async getGrade(email) {
    const rows = await this.query(
      `
      SELECT * FROM grade WHERE grade_id = (SELECT grade_id FROM student WHERE email=?)
    `,
      [email],
    );
    return rows[0];
  }

  async getTeacherSubject(email) {
    const rows = await this.query(
      `
      SELECT * from teacher natural join subject WHERE email=?
    
    `,
      [email],
    );

    return rows[0];
  }

  // async getAvailableGrades() {
  //   const rows = await this.query(
  //     `
  //     SELECT * from grade

  //   `);

  //   return rows;
  // }

  async getTeacherAssignmets(email) {
    const rows = await this.query(
      `
    SELECT * from assignment WHERE user_email=? ORDER BY upload_date desc
  
  `,
      [email],
    );

    return rows;
  }

  async getUserSubjects(email) {
    const rows = await this.query(
      `
   SELECT * FROM user WHERE email=?
    `,
      [email],
    );

    const usertype = rows[0].type;
    let subjects = [];
    if (usertype == 'student') {
      subjects = await this.query(
        `
      SELECT subject_id,subject FROM grade_subject INNER JOIN subject USING(subject_id) WHERE grade_id = (SELECT grade_id FROM student WHERE email=?)
    `,
        [email],
      );
      const grade = await this.query(
        `SELECT grade_id,grade FROM student INNER JOIN grade USING(grade_id) WHERE student.email=?`,
        [email],
      );
      subjects.push(grade[0]);
    } else if (usertype == 'teacher') {
      const subjectTeacher = await this.query(
        `
      SELECT subject_id,subject FROM teacher INNER JOIN subject USING(subject_id) WHERE teacher.email=?
    `,
        [email],
      );
      subjects = await this.query(
        `
      SELECT grade_id,grade FROM grade;
    `,
      );
      subjects.push(subjectTeacher);
    }
    return subjects;
  }

  async getUserStudyMaterial(email) {
    const rows = await this.query(
      `
   SELECT * FROM user WHERE email=?
    `,
      [email],
    );

    const usertype = rows[0].type;
    let study = [];
    if (usertype == 'student') {
      study = await this.query(
        `
       SELECT sm.titile,s.subject,s.subject_id ,u.name,sm.description,upload_id,upload_date FROM ((study_material sm INNER JOIN user u ON sm.teacher_email=u.email) INNER JOIN subject s USING(subject_id)) INNER JOIN upload USING(upload_id) WHERE grade_id=(SELECT grade_id FROM student WHERE email=?) ORDER BY study_material_id DESC;
    `,
        [email],
      );
    } else if (usertype == 'teacher') {
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
      [data.upload_id, data.teacher_email, data.subject, data.grade, data.description, data.title],
    );
  }

  async getAvailableGrades() {
    const rows = await this.query(
      `
      SELECT * from grade
    
    `,
    );

    return rows;
  }

  async getAssignmentID(upload_id) {
    const rows = await this.query(
      `
      select assignment_id from submission where (upload_id = ?);
      `,
      [upload_id],
    );
    return rows[0];
  }

  async getSubjectID(assignment_id) {
    const rows = await this.query(
      `select subject_id from assignment where (assignment_id = ?);
      `,
      [assignment_id],
    );
    return rows[0];
  }

  async writeToMarksTable(student_email, teacher_email, assignment_id, subject_id, marks, comment) {
    console.log(marks);
    const rows = await this.query(
      `
      INSERT INTO mark (student_email,teacher_email,assignment_id,subject_id,marks,comment)
      VALUES (?,?,?,?,?,?)
      `,
      [student_email, teacher_email, assignment_id, subject_id, marks, comment],
    );
  }

  async getSubmissionForAssignement(assignment_id) {
    const rows = await this.query(
      `
    SELECT u.name,s.email,s.upload_id FROM submission s INNER JOIN user u ON s.email=u.email WHERE s.assignment_id=?;
    `,
      [assignment_id],
    );

    for (let i = 0; i < rows.length; i++) {
      rows[i].grade = '';
      rows[i].comment = '';
    }

    return rows;
  }

  async getGrades() {
    const data = await this.query(`
  SELECT * FROM grade`);
    if (data === []) {
      return data;
    } else {
      return data;
    }
  }

  async addSubject(data) {
    return await data.map((value) => {
      this.query(
        `
        INSERT INTO subject (subject)
        VALUES (?)
    `,
        [value],
      );
    });
  }
  async getSubjects() {
    const data = await this.query(`
  SELECT * FROM subject`);
    if (data === []) {
      return data;
    } else {
      return data;
    }
  }
  async addGradeSubjects(data) {
    return await data.map((value) => {
      this.query(
        `
        INSERT INTO grade_subject (grade_id , subject_id)
        VALUES (? , ?)
    `,
        [value.grade_id, value.subject_id],
      );
    });
  }
  async getGradeSubjects() {
    const data = await this.query(`
  SELECT * FROM grade_subject`);
    if (data === []) {
      return data;
    } else {
      return data;
    }
  }
}
