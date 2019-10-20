import { TestBed } from '@angular/core/testing';

import { ProfileStatsService } from './profile-stats.service';

describe('ProfileStatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileStatsService = TestBed.get(ProfileStatsService);
    expect(service).toBeTruthy();
  });
});
