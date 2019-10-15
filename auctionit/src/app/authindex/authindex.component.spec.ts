import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthindexComponent } from './authindex.component';

describe('AuthindexComponent', () => {
  let component: AuthindexComponent;
  let fixture: ComponentFixture<AuthindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
