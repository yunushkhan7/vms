import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingFloorManagementAddComponent } from './building-floor-management-add.component';

describe('BuildingFloorManagementAddComponent', () => {
  let component: BuildingFloorManagementAddComponent;
  let fixture: ComponentFixture<BuildingFloorManagementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingFloorManagementAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingFloorManagementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
