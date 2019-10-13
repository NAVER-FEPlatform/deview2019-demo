import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDeviewRecycleComponent } from './ngx-deview-recycle.component';

describe('NgxDeviewRecycleComponent', () => {
  let component: NgxDeviewRecycleComponent;
  let fixture: ComponentFixture<NgxDeviewRecycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDeviewRecycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDeviewRecycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
