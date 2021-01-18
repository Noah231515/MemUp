import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedCoursesCardComponent } from './subscribed-courses-card.component';

describe('SubscribedCoursesCardComponent', () => {
  let component: SubscribedCoursesCardComponent;
  let fixture: ComponentFixture<SubscribedCoursesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedCoursesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedCoursesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
