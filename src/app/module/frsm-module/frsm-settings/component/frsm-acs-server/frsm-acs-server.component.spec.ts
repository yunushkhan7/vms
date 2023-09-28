import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmAcsServerComponent } from './frsm-acs-server.component';

describe('FrsmAcsServerComponent', () => {
  let component: FrsmAcsServerComponent;
  let fixture: ComponentFixture<FrsmAcsServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmAcsServerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmAcsServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
