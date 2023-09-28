import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingFloorManagementComponent } from './building-floor-management.component';

describe('BuildingFloorManagementComponent', () => {
  let component: BuildingFloorManagementComponent;
  let fixture: ComponentFixture<BuildingFloorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingFloorManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingFloorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
