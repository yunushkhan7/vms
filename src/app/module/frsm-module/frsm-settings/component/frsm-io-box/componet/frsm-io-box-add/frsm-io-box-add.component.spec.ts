import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmIoBoxAddComponent } from './frsm-io-box-add.component';

describe('FrsmIoBoxAddComponent', () => {
  let component: FrsmIoBoxAddComponent;
  let fixture: ComponentFixture<FrsmIoBoxAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmIoBoxAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmIoBoxAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
