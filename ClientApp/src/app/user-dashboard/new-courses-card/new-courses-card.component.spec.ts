import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCoursesCardComponent } from './new-courses-card.component';

describe('NewCoursesCardComponent', () => {
  let component: NewCoursesCardComponent;
  let fixture: ComponentFixture<NewCoursesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCoursesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCoursesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
