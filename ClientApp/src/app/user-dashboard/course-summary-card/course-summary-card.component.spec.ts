import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSummaryCardComponent } from './course-summary-card.component';

describe('CourseSummaryCardComponent', () => {
  let component: CourseSummaryCardComponent;
  let fixture: ComponentFixture<CourseSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSummaryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
