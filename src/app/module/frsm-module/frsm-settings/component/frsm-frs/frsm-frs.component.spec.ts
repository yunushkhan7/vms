import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmFrsComponent } from './frsm-frs.component';

describe('FrsmFrsComponent', () => {
  let component: FrsmFrsComponent;
  let fixture: ComponentFixture<FrsmFrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmFrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmFrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
