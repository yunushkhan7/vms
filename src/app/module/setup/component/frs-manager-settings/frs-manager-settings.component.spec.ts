import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsManagerSettingsComponent } from './frs-manager-settings.component';

describe('FrsManagerSettingsComponent', () => {
  let component: FrsManagerSettingsComponent;
  let fixture: ComponentFixture<FrsManagerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsManagerSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsManagerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
