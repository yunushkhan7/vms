import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorAccessLogComponent } from './visitor-access-log.component';

describe('VisitorAccessLogComponent', () => {
  let component: VisitorAccessLogComponent;
  let fixture: ComponentFixture<VisitorAccessLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorAccessLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorAccessLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
