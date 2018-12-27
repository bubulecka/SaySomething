import { TestBed } from '@angular/core/testing';

import { PostsControlService } from './posts-control.service';

describe('PostsControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostsControlService = TestBed.get(PostsControlService);
    expect(service).toBeTruthy();
  });
});
