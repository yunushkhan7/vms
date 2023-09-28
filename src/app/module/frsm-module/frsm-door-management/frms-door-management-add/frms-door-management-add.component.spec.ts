import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmsDoorManagementAddComponent } from './frms-door-management-add.component';

describe('FrmsDoorManagementAddComponent', () => {
  let component: FrmsDoorManagementAddComponent;
  let fixture: ComponentFixture<FrmsDoorManagementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmsDoorManagementAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmsDoorManagementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
