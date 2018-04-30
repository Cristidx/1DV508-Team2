import { Component, OnInit } from '@angular/core';
import { AngularFireAuth  } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {

  }

  private createAccount() {
    this.authService.createAccountWithRegularEmail(this.user.email, this.user.password)
      .then(() => this.router.navigateByUrl(''));
  }
}
