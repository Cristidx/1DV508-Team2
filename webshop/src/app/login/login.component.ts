import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {

  }

  private signInWithGoogle() {
    this.authService.googleLogin()
    .then((user) => this.router.navigate([''])
    .catch((error) => console.log(error)));
  }

  private signInWithGithub() {
    this.authService.githubLogin()
    .then((user) => this.router.navigate([''])
    .catch((error) => console.log(error)));
  }

  private signIn(): void {
    this.authService.signInWithRegularEmail(this.user.email, this.user.password)
    .then((user) => this.router.navigate([''])
    .catch((error) => console.log(error)));
  }
}
