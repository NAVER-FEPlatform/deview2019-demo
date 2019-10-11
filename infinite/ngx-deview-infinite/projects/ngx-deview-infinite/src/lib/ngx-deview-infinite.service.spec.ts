import { TestBed } from '@angular/core/testing';

import { NgxDeviewInfiniteService } from './ngx-deview-infinite.service';

describe('NgxDeviewInfiniteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxDeviewInfiniteService = TestBed.get(NgxDeviewInfiniteService);
    expect(service).toBeTruthy();
  });
});
