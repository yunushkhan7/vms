import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmEamilNotificationComponent } from './frsm-eamil-notification.component';

describe('FrsmEamilNotificationComponent', () => {
  let component: FrsmEamilNotificationComponent;
  let fixture: ComponentFixture<FrsmEamilNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmEamilNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmEamilNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
