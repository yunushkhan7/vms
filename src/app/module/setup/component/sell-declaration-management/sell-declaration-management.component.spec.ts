import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellDeclarationManagementComponent } from './sell-declaration-management.component';

describe('SellDeclarationManagementComponent', () => {
  let component: SellDeclarationManagementComponent;
  let fixture: ComponentFixture<SellDeclarationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellDeclarationManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellDeclarationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
