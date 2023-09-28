import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmBuildingManagementComponent } from './frsm-building-management.component';

describe('FrsmBuildingManagementComponent', () => {
  let component: FrsmBuildingManagementComponent;
  let fixture: ComponentFixture<FrsmBuildingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmBuildingManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmBuildingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
