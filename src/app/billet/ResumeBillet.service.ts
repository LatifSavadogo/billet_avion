// resume.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private resumeData: any;

  setResumeData(data: any) {
    this.resumeData = data;
  }

  getResumeData() {
    return this.resumeData;
  }
}
