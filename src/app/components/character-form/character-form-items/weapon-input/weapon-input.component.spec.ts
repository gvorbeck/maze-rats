import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponInputComponent } from './weapon-input.component';

describe('WeaponInputComponent', () => {
  let component: WeaponInputComponent;
  let fixture: ComponentFixture<WeaponInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaponInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeaponInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
