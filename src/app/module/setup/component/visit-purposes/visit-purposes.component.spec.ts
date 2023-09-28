import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitPurposesComponent } from './visit-purposes.component';

describe('VisitPurposesComponent', () => {
  let component: VisitPurposesComponent;
  let fixture: ComponentFixture<VisitPurposesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitPurposesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitPurposesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
