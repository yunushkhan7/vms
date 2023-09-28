import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsAddComponent } from './logs-add.component';

describe('LogsAddComponent', () => {
  let component: LogsAddComponent;
  let fixture: ComponentFixture<LogsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
