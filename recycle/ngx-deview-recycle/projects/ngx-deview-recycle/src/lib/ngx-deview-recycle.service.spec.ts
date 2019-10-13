import { TestBed } from '@angular/core/testing';

import { NgxDeviewRecycleService } from './ngx-deview-recycle.service';

describe('NgxDeviewRecycleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxDeviewRecycleService = TestBed.get(NgxDeviewRecycleService);
    expect(service).toBeTruthy();
  });
});
