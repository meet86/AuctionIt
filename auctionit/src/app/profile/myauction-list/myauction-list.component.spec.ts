import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyauctionListComponent } from './myauction-list.component';

describe('MyauctionListComponent', () => {
  let component: MyauctionListComponent;
  let fixture: ComponentFixture<MyauctionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyauctionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyauctionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
