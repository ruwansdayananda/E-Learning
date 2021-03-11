import { BaseModule, inject } from '../core/base.module';
import { UserDao } from './user.dao';

export class UserService extends BaseModule {
  __SINGLETON__ = true;
  dao = inject(UserDao);

  async saveUser(data) {
    return await this.dao.saveUser(data);
  }
  async saveAssignment(data) {
    return await this.dao.saveAssignment(data);
  }
  async saveFileInfo(data) {
    return await this.dao.saveFileInfo(data);
  }
  async getFileInfo(data) {
    return await this.dao.getFileInfo(data);
  }
  async getFileName(upload_id) {
    return await this.dao.getFileName(upload_id);
  }
  async getUser(email) {
    return await this.dao.getUser(email);
  }
  async getUserInformation(email) {
    return await this.dao.getUserInformation(email);
  }

  async listAssignments(email, grade) {
    return await this.dao.listAssignments(email, grade);
  }

  async getStudentInformation(email) {
    return await this.dao.getStudentInformation(email);
  }

  async getFileLocation(upload_id) {
    return await this.dao.getFileLocation(upload_id);
  }

  async listCompletedAssignments(email) {
    return await this.dao.listCompletedAssignments(email);
  }

  async writeToUploadsTable(upload_id, filename, file_size, fileExtension, mimetype) {
    return await this.dao.writeToUploadsTable(
      upload_id,
      filename,
      file_size,
      fileExtension,
      mimetype,
    );
  }

  async writeToSubmissionTable(updated_upload_id, assignment_id, email) {
    return await this.dao.writeToSubmissionTable(updated_upload_id, assignment_id, email);
  }

  async getLastUploadID() {
    return await this.dao.getLastUploadID();
  }

  // async getTeacherSubject(email) {
  //   return await this.dao.getTeacherSubject(email);
  // }
  // async getAvailableGrades() {
  //   return await this.dao.getAvailableGrades();
  // }
  async getUserSubjects(email) {
    return await this.dao.getUserSubjects(email);
  }
  async getUserStudyMaterial(email) {
    return await this.dao.getUserStudyMaterial(email);
  }
  async saveStudyMatInfo(data) {
    return await this.dao.saveStudyMatInfo(data);
  }
  async getMarksInformation(email) {
    return await this.dao.getMarksInformation(email);
  }
  async getGrade(email) {
    return await this.dao.getGrade(email);
  }

  async getAssignmentID(upload_id) {
    return await this.dao.getAssignmentID(upload_id);
  }

  async getSubjectID(assignment_id) {
    return await this.dao.getSubjectID(assignment_id);
  }
  async writeToMarksTable(student_email, teacher_email, assignment_id, subject_id, marks, comment) {
    return await this.dao.writeToMarksTable(
      student_email,
      teacher_email,
      assignment_id,
      subject_id,
      marks,
      comment,
    );
  }

  async getSubmissionForAssignement(data) {
    return await this.dao.getSubmissionForAssignement(data);
  }
  async getTeacherSubject(email) {
    return await this.dao.getTeacherSubject(email);
  }
  async getTeacherAssignmets(email) {
    return await this.dao.getTeacherAssignmets(email);
  }
  async getAvailableGrades() {
    return await this.dao.getAvailableGrades();
  }
  async addSubject(data) {
    return await this.dao.addSubject(data);
  }
  async getSubjects() {
    return await this.dao.getSubjects();
  }
  async addGradeSubjects(data) {
    return await this.dao.addGradeSubjects(data);
  }
  async getGradeSubjects() {
    return await this.dao.getGradeSubjects();
  }

  async getGrades() {
    return await this.dao.getGrades();
  }
}
