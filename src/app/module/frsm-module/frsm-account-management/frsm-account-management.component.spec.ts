import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmAccountManagementComponent } from './frsm-account-management.component';

describe('FrsmAccountManagementComponent', () => {
  let component: FrsmAccountManagementComponent;
  let fixture: ComponentFixture<FrsmAccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmAccountManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
