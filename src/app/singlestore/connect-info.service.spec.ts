import { TestBed } from '@angular/core/testing';

import { ConnectInfoService } from './connect-info.service';

describe('ConnectInfoService', () => {
  let service: ConnectInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
