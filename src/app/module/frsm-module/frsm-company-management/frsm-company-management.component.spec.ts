import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmCompanyManagementComponent } from './frsm-company-management.component';

describe('FrsmCompanyManagementComponent', () => {
  let component: FrsmCompanyManagementComponent;
  let fixture: ComponentFixture<FrsmCompanyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmCompanyManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmCompanyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
