import { TestBed } from '@angular/core/testing';

import { DepartmetService } from './departmet.service';

describe('DepartmetService', () => {
  let service: DepartmetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
