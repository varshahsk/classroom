import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-addclassroom',
  templateUrl: './addclassroom.component.html',
  styleUrls: ['./addclassroom.component.css'],
})
export class AddclassroomComponent {
  newclassroom: string = '';
  starttime: string = '';
  endtime: string = '';
  subject: string = '';
  classrooms: string[] = [];
  students: string[] = [];
  selectedStudents: { [key: string]: boolean } = {};
  selectedClassroom: any;
  showDetails: boolean = false;

  constructor(public sharedService: SharedService) {
    this.classrooms = this.sharedService.classrooms;
    this.students = this.sharedService.students;
  }
  additem() {
    if (this.classrooms.includes(this.newclassroom)) {
      alert('Classroom with the same name already exists. Choose a different name.');
      return;
    }
    this.sharedService.addClassroom(this.newclassroom, this.selectedStudents);
    this.newclassroom = '';
    this.starttime = '';
    this.endtime = '';
    this.subject = '';
    this.selectedStudents = {};
  }
  removeitem(index: number) {
    const removedClassroomName = this.classrooms[index];
    this.sharedService.classrooms.splice(index, 1);
    this.sharedService.classroomStudents.splice(index, 1);
    if (this.selectedClassroom && this.selectedClassroom.name === removedClassroomName) {
      this.selectedClassroom = null;
      this.showDetails = false; 
    }
  }
  showClassroomDetails(index: number) {
    this.selectedClassroom = {
      name: this.classrooms[index],
      students: this.sharedService.classroomStudents[index],
    };
    this.showDetails = true; 
  }
}
