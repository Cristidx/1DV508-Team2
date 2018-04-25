import { TestBed, inject } from '@angular/core/testing';

import { DataCloudService } from './data-cloud.service';

describe('DataCloudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCloudService]
    });
  });

  it('should be created', inject([DataCloudService], (service: DataCloudService) => {
    expect(service).toBeTruthy();
  }));
});
