import { Component, Output, EventEmitter, OnInit, SimpleChanges, OnChanges, AfterViewInit, ViewChild, TemplateRef, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchTarget: '';

  constructor(private dataService: DataService) {

  }

  updateSearchTarget(e) {
    
  }

  updateSearchTargetClick() {
    this.dataService.updateSearchTarget(this.searchTarget);
  }
}
