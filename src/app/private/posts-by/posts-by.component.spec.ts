import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsByComponent } from './posts-by.component';

describe('PostsByComponent', () => {
  let component: PostsByComponent;
  let fixture: ComponentFixture<PostsByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
