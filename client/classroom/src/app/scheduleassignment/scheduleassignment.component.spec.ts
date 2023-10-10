import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleassignmentComponent } from './scheduleassignment.component';

describe('ScheduleassignmentComponent', () => {
  let component: ScheduleassignmentComponent;
  let fixture: ComponentFixture<ScheduleassignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleassignmentComponent]
    });
    fixture = TestBed.createComponent(ScheduleassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
