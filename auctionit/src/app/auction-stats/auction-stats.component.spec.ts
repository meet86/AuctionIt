import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionStatsComponent } from './auction-stats.component';

describe('AuctionStatsComponent', () => {
  let component: AuctionStatsComponent;
  let fixture: ComponentFixture<AuctionStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
