import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmFloorManagementComponent } from './frsm-floor-management.component';

describe('FrsmFloorManagementComponent', () => {
  let component: FrsmFloorManagementComponent;
  let fixture: ComponentFixture<FrsmFloorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmFloorManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmFloorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
