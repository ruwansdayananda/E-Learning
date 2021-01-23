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

  async listAssignments(email,grade){
    return await this.dao.listAssignments(email,grade);
  }

  async getStudentInformation(email){
    return await this.dao.getStudentInformation(email);
  }

  async getFileLocation(upload_id){
    return await this.dao.getFileLocation(upload_id);
  }

  async listCompletedAssignments(email){
    return await this.dao.listCompletedAssignments(email);
  }

  async writeToUploadsTable(upload_id,filename,file_size,fileExtension,mimetype){
    return await this.dao.writeToUploadsTable(upload_id,filename,file_size,fileExtension,mimetype);
  }
  
  async writeToSubmissionTable(updated_upload_id,assignment_id,email){
    return await this.dao.writeToSubmissionTable(updated_upload_id,assignment_id,email);
  }

  async getLastUploadID(){
    return await this.dao.getLastUploadID();
  }

}
