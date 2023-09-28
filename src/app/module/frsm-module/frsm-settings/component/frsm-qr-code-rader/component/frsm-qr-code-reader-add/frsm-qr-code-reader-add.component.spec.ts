import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmQrCodeReaderAddComponent } from './frsm-qr-code-reader-add.component';

describe('FrsmQrCodeReaderAddComponent', () => {
  let component: FrsmQrCodeReaderAddComponent;
  let fixture: ComponentFixture<FrsmQrCodeReaderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmQrCodeReaderAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmQrCodeReaderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
