import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-submitassignment',
  templateUrl: './submitassignment.component.html',
  styleUrls: ['./submitassignment.component.css']
})
export class SubmitassignmentComponent {
  loading: boolean = false;
  shortLinks: string[] = [];
  errorMessage: string | undefined;
  constructor(private http: HttpClient) {}
  onUpload(event: any): void {
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
    if (file) {
      this.uploadFile(file);
    } else {
      console.error('No file selected.');
    }
  }
  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);

    this.loading = true;
    this.errorMessage = undefined;
    const apiUrl = 'http://localhost:3000/upload';

    this.http.post(apiUrl, formData).subscribe(
    (response: any) => {
     this.shortLinks.push(response.filename);
    this.loading = false;
     },
  (error) => {
  this.loading = false;
  this.errorMessage = 'File upload failed. Please try again.';
      }
    );
  }
}
