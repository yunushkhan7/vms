import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmIoTriggerMangAddComponent } from './frsm-io-trigger-mang-add.component';

describe('FrsmIoTriggerMangAddComponent', () => {
  let component: FrsmIoTriggerMangAddComponent;
  let fixture: ComponentFixture<FrsmIoTriggerMangAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmIoTriggerMangAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmIoTriggerMangAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
