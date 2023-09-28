import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmDoorManagementComponent } from './frsm-door-management.component';

describe('FrsmDoorManagementComponent', () => {
  let component: FrsmDoorManagementComponent;
  let fixture: ComponentFixture<FrsmDoorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmDoorManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmDoorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
