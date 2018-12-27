import { TestBed } from '@angular/core/testing';

import { SearchUsersService } from './search-users.service';

describe('SearchUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchUsersService = TestBed.get(SearchUsersService);
    expect(service).toBeTruthy();
  });
});
