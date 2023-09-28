import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmSettingsComponent } from './frsm-settings.component';

describe('FrsmSettingsComponent', () => {
  let component: FrsmSettingsComponent;
  let fixture: ComponentFixture<FrsmSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
