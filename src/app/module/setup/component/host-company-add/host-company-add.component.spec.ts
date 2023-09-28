import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostCompanyAddComponent } from './host-company-add.component';

describe('HostCompanyAddComponent', () => {
  let component: HostCompanyAddComponent;
  let fixture: ComponentFixture<HostCompanyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostCompanyAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostCompanyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
