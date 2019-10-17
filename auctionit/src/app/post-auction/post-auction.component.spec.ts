import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAuctionComponent } from './post-auction.component';

describe('PostAuctionComponent', () => {
  let component: PostAuctionComponent;
  let fixture: ComponentFixture<PostAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
