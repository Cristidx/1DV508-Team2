import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCloudComponent } from './data-cloud.component';

describe('DataCloudComponent', () => {
  let component: DataCloudComponent;
  let fixture: ComponentFixture<DataCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
