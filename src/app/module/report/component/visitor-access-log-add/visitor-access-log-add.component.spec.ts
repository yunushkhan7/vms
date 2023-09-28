import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorAccessLogAddComponent } from './visitor-access-log-add.component';

describe('VisitorAccessLogAddComponent', () => {
  let component: VisitorAccessLogAddComponent;
  let fixture: ComponentFixture<VisitorAccessLogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorAccessLogAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorAccessLogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
