import { TestBed } from '@angular/core/testing';

import { AsigmentService } from './asigment.service';

describe('AsigmentService', () => {
  let service: AsigmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsigmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
