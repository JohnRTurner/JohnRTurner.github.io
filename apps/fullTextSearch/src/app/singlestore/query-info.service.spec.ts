import { TestBed } from '@angular/core/testing';

import { QueryInfoService } from './query-info.service';

describe('QueryInfoService', () => {
  let service: QueryInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
