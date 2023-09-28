import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmsCompanyManagementAddComponent } from './frms-company-management-add.component';

describe('FrmsCompanyManagementAddComponent', () => {
  let component: FrmsCompanyManagementAddComponent;
  let fixture: ComponentFixture<FrmsCompanyManagementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmsCompanyManagementAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmsCompanyManagementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
