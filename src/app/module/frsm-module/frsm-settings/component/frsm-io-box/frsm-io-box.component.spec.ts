import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmIoBoxComponent } from './frsm-io-box.component';

describe('FrsmIoBoxComponent', () => {
  let component: FrsmIoBoxComponent;
  let fixture: ComponentFixture<FrsmIoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmIoBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmIoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
