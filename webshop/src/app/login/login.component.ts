import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private authService: AuthService;
  private signedInUser: Promise<User>;

  user = {
    email: '',
    password: ''
  };

  constructor(authService: AuthService, private router: Router) {
    this.authService = authService;
  }

  ngOnInit() {

  }

  login() {
    this.authService.signInWithRegularEmail(this.user.email, this.user.password)
    .then((user) => (this.router.navigate(['']))
    .catch((error) => console.log(error)));
  }

}
