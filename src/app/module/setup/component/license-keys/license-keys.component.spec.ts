import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseKeysComponent } from './license-keys.component';

describe('LicenseKeysComponent', () => {
  let component: LicenseKeysComponent;
  let fixture: ComponentFixture<LicenseKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseKeysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
