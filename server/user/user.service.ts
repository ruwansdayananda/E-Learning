import { BaseModule, inject } from '@core/base.module';
import { UserDao } from './user.dao';

export class UserService extends BaseModule {
  __SINGLETON__ = true;
  dao = inject(UserDao);

  async saveUser(data) {
    return await this.dao.saveUser(data);
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
  async getMarksInformation(email) {
    return await this.dao.getMarksInformation(email);
  }
  async getGrade(email) {
    return await this.dao.getGrade(email);
  }
  async getStudentGPA(email) {
    return await this.dao.getStudentGPA(email);
  }

  async getAssignmentID(upload_id){
    return await this.dao.getAssignmentID(upload_id);
  }

  async getSubjectID(assignment_id){
    return await this.dao.getSubjectID(assignment_id);
  }
  async writeToMarksTable(student_email,teacher_email,assignment_id,subject_id,marks,comment){
    return await this.dao.writeToMarksTable(student_email,teacher_email,assignment_id,subject_id,marks,comment);
  }

  async getSubmissionForAssignement(data) {
    return await this.dao.getSubmissionForAssignement(data);
  }

}
