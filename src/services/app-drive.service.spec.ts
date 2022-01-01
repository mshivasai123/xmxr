import { TestBed } from '@angular/core/testing';

import { AppDriveService } from './app-drive.service';

describe('AppDriveService', () => {
  let service: AppDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppDriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
