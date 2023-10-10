import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-scheduleassignment',
  templateUrl: './scheduleassignment.component.html',
  styleUrls: ['./scheduleassignment.component.css'],
})
export class ScheduleassignmentComponent {
  newquestion: string = '';
  showQuestions: boolean = false;
  constructor(private sharedService: SharedService) {}
  get questions() {
    return this.sharedService.questions;}
  additem() {
    this.sharedService.addQuestion(this.newquestion);
    this.newquestion = '';
  }
removeitem(index: number) {
    this.sharedService.removeQuestion(index);
  }
  showQuestionsButtonClick() {
    this.showQuestions = !this.showQuestions;
  }
}
