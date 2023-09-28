import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostCompanyManagementComponent } from './host-company-management.component';

describe('HostCompanyManagementComponent', () => {
  let component: HostCompanyManagementComponent;
  let fixture: ComponentFixture<HostCompanyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostCompanyManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostCompanyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
