import { TestBed } from '@angular/core/testing';

import { PostauctionService } from './postauction.service';

describe('PostauctionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostauctionService = TestBed.get(PostauctionService);
    expect(service).toBeTruthy();
  });
});
