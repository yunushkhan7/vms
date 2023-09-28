import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmSmtpComponent } from './frsm-smtp.component';

describe('FrsmSmtpComponent', () => {
  let component: FrsmSmtpComponent;
  let fixture: ComponentFixture<FrsmSmtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmSmtpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmSmtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
