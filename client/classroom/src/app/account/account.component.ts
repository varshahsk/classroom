// account.ts
import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'], // Adjust the path as needed
})
export class AccountComponent {
  classrooms: string[] = [];
  selectedClassroom: any; 

  constructor(public sharedService: SharedService) {
    this.classrooms = this.sharedService.classrooms;
  }

  showClassroomDetails(classroom: string) {
    const index = this.classrooms.indexOf(classroom);
    if (index !== -1) {
      this.selectedClassroom = {
        name: this.classrooms[index],
        students: this.sharedService.classroomStudents[index],
        
      };
    }
  }
}

