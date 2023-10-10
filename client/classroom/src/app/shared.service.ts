import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  selectedClassroom: any; 
showDetails: boolean = false;

  classrooms: string[] = [];
  students: string[] = [];
  classroomStudents: string[][] = [];
  addClassroom(newclassroom: string, selectedStudents: { [key: string]: boolean }) {
    const selectedStudentNames = this.students.filter(name => selectedStudents[name]);
    this.classrooms.push(newclassroom);
    this.classroomStudents.push(selectedStudentNames);
  }
  removeClassroom(classroomToRemove: string) {
    const classroomIndex = this.classrooms.indexOf(classroomToRemove);
    if (classroomIndex !== -1) {
      this.classrooms.splice(classroomIndex, 1);
      this.classroomStudents.splice(classroomIndex, 1);
    } else {
      console.error(`Classroom "${classroomToRemove}" not found.`);
    }
  }
  addStudent(newStudent: string, classroom: string) {
    if (this.students.includes(newStudent)) {
      console.error(`Student "${newStudent}" is already added.`);
      return;
    }
    this.students.push(newStudent);
    const classroomIndex = this.classrooms.indexOf(classroom);
    if (classroomIndex !== -1) {
      if (!this.classroomStudents[classroomIndex].includes(newStudent)) {
        this.classroomStudents[classroomIndex].push(newStudent);
      } else {
        console.error(`Student "${newStudent}" is already in classroom "${classroom}".`);
      }
    } else {
      console.error(`Classroom "${classroom}" not found.`);
    }
  }
  
  removeStudent(studentToRemove: string) {
    this.students = this.students.filter(student => student !== studentToRemove);
    this.classroomStudents.forEach((classroom, index) => {
      this.classroomStudents[index] = classroom.filter(student => student !== studentToRemove);
    });
  }
  questions: any[] = [];
  addQuestion(newQuestion: string) {
    const newItem = { question: newQuestion };
    this.questions.push(newItem);
  }
  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }
}

