import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitassignmentComponent } from './submitassignment.component';

describe('SubmitassignmentComponent', () => {
  let component: SubmitassignmentComponent;
  let fixture: ComponentFixture<SubmitassignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitassignmentComponent]
    });
    fixture = TestBed.createComponent(SubmitassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
