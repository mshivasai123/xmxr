import { TestBed } from '@angular/core/testing';

import { AddInterceptService } from './add-intercept.service';

describe('AddInterceptService', () => {
  let service: AddInterceptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddInterceptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
