import { Component, OnInit } from '@angular/core';
import { AngularFireAuth  } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

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

  constructor(authService: AuthService) {
  }

  ngOnInit() {
  }

  createAccount() {

  }

}
