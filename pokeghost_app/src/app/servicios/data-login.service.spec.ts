import { TestBed } from '@angular/core/testing';

import { DataLoginService } from './data-login.service';

describe('DataLoginService', () => {
  let service: DataLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
