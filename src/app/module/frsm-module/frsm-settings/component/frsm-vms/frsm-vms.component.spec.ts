import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmVmsComponent } from './frsm-vms.component';

describe('FrsmVmsComponent', () => {
  let component: FrsmVmsComponent;
  let fixture: ComponentFixture<FrsmVmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmVmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmVmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
