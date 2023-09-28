import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmIoTriggerManagementComponent } from './frsm-io-trigger-management.component';

describe('FrsmIoTriggerManagementComponent', () => {
  let component: FrsmIoTriggerManagementComponent;
  let fixture: ComponentFixture<FrsmIoTriggerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmIoTriggerManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmIoTriggerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
