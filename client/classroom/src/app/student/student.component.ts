import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  newstudent: string = '';
  id: string = '';
  classroom: string = '';
  email: string = '';
  address: string = '';
  students: { classroom: string; newstudent: string; id: string }[] = [];

  constructor(public sharedService: SharedService) {
    this.students = this.sharedService.students.map(student => ({
      classroom: '',
      newstudent: student,
      id: '' 
    }));
  }

  additem() {
    if (this.sharedService.classrooms.indexOf(this.classroom) === -1) {
      alert('Error: Classroom does not exist!');
      return;
    }

    const newItem = {
      classroom: this.classroom,
      newstudent: this.newstudent,
      id: this.id 
    };

    const existingStudent = this.students.find(student => student.id === this.id);

    if (existingStudent) {
      alert(`Error: Student with ID "${this.id}" already exists.`);
      return;
    }

    this.sharedService.students.push(this.newstudent);
    this.sharedService.classroomStudents[this.sharedService.classrooms.indexOf(this.classroom)].push(this.newstudent);
    this.students.push(newItem);
    this.newstudent = '';
    this.id = '';
    this.classroom = '';
    this.email = '';
    this.address = '';
  }
  removeitem(index: number) {
    console.log('Remove item called with index:', index);
    const removedStudent: string = this.students[index].newstudent;
    this.students.splice(index, 1);
    this.sharedService.removeStudent(removedStudent);
  }
  removeClassroom(classroomToRemove: string) {
    const classroomIndex = this.sharedService.classrooms.indexOf(classroomToRemove);
    if (classroomIndex !== -1) {
      this.sharedService.classrooms.splice(classroomIndex, 1);
      this.sharedService.classroomStudents.splice(classroomIndex, 1);
      const removedStudents = this.sharedService.classroomStudents[classroomIndex];
      if (this.sharedService.selectedClassroom && this.sharedService.selectedClassroom.name === classroomToRemove) {
        this.sharedService.selectedClassroom = null;
        this.sharedService.showDetails = false;
      }
      removedStudents.forEach(student => {
        if (this.sharedService.students.includes(student)) {
          this.sharedService.removeStudent(student);
        }
      });
      removedStudents.forEach(student => {
        const index = this.students.findIndex(s => s.newstudent === student);
        if (index !== -1) {
          this.removeitem(index);
        }
      });
    } else {
      console.error(`Classroom "${classroomToRemove}" not found.`);
    }
  }
}