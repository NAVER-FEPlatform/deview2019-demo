import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDeviewInfiniteComponent } from './ngx-deview-infinite.component';

describe('NgxDeviewInfiniteComponent', () => {
  let component: NgxDeviewInfiniteComponent;
  let fixture: ComponentFixture<NgxDeviewInfiniteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDeviewInfiniteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDeviewInfiniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
