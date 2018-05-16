import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  item: Observable<any>;
  title = 'Title';
  constructor(private db: AngularFireDatabase, private router: Router) {
    this.item = db.object('object').valueChanges();
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
