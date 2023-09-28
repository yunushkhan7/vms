import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmLogsComponent } from './frsm-logs.component';

describe('FrsmLogsComponent', () => {
  let component: FrsmLogsComponent;
  let fixture: ComponentFixture<FrsmLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
