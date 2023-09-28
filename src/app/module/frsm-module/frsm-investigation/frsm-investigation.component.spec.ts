import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmInvestigationComponent } from './frsm-investigation.component';

describe('FrsmInvestigationComponent', () => {
  let component: FrsmInvestigationComponent;
  let fixture: ComponentFixture<FrsmInvestigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmInvestigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
