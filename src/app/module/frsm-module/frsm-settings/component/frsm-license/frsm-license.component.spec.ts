import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmLicenseComponent } from './frsm-license.component';

describe('FrsmLicenseComponent', () => {
  let component: FrsmLicenseComponent;
  let fixture: ComponentFixture<FrsmLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmLicenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
