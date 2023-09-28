import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmQrCodeRaderComponent } from './frsm-qr-code-rader.component';

describe('FrsmQrCodeRaderComponent', () => {
  let component: FrsmQrCodeRaderComponent;
  let fixture: ComponentFixture<FrsmQrCodeRaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmQrCodeRaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmQrCodeRaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
