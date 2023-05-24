import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDataStepComponent } from './basic-data-step.component';

describe('BasicDataStepComponent', () => {
  let component: BasicDataStepComponent;
  let fixture: ComponentFixture<BasicDataStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDataStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDataStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
