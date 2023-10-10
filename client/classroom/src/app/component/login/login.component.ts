import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    id: '',
    password: '',
    name:'',
    userType:''
  };
  constructor(private authService: AuthService, private router: Router) {}

  handleLogin() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        alert('Login successful!');
        this.router.navigate(['/home']);
      },
      (error) => {
        alert('Invalid credentials or internal server error');
        console.error(error);
      }
    );
  }
}
