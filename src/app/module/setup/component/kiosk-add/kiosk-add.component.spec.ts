import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskAddComponent } from './kiosk-add.component';

describe('KioskAddComponent', () => {
  let component: KioskAddComponent;
  let fixture: ComponentFixture<KioskAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KioskAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KioskAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
