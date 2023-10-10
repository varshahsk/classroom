import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router'; 
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { AddclassroomComponent } from './addclassroom/addclassroom.component';

import { SubmitassignmentComponent } from './submitassignment/submitassignment.component';
import { ScheduleassignmentComponent } from './scheduleassignment/scheduleassignment.component'; 
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'addclassroom', component: AddclassroomComponent },
      { path: 'student', component: StudentComponent },
      { path: 'scheduleassignment', component: ScheduleassignmentComponent },
      { path: 'submitassignment', component: SubmitassignmentComponent },
    
    ],
  },
  { path:'',  component: LoginComponent ,pathMatch: 'full' },
  { path:'signup',component: SignupComponent },
 
];



@NgModule({ 
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule], 
  providers: [] 
}) 
export class AppRoutingModule { }
