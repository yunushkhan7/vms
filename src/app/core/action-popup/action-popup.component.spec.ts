import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPopupComponent } from './action-popup.component';

describe('ActionPopupComponent', () => {
  let component: ActionPopupComponent;
  let fixture: ComponentFixture<ActionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
