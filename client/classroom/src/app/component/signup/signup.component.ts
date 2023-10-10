import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  credentials = {
    id: '',
    password: '',
    name:'',
    userType:''
  };

  constructor(private authService: AuthService, private router: Router) {}

  handleSignUp() {
    this.authService.signUp(this.credentials).subscribe(
      (response) => {
        alert('Signup successful!');
        this.router.navigate(['/']);
      },
      (error) => {
        alert('Invalid credentials or internal server error');
        console.error(error);
      }
    );
  }
}
