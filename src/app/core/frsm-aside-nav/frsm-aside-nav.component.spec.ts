import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrsmAsideNavComponent } from './frsm-aside-nav.component';

describe('FrsmAsideNavComponent', () => {
  let component: FrsmAsideNavComponent;
  let fixture: ComponentFixture<FrsmAsideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrsmAsideNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrsmAsideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
