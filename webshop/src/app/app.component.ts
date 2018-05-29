import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showMovieCheck: boolean = true;
  searchTarget: '';


  


  constructor(private data: DataService, private router: Router) {

  }
 
  updateSearchTarget(e) {
    
  }

  updateSearchTargetClick() {
    this.data.updateSearchTarget(this.searchTarget);
  }

  

  goToHome() {
    this.router.navigate(['/']);
    this.searchTarget = '';
    this.updateSearchTargetClick();
    this.data.getavgRating(this.showMovieCheck);
    this.data.changeHeaderGenre('');
    
  }

  
}
