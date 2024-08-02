import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAbilityInputComponent } from './character-ability-input.component';

describe('CharacterAbilityInputComponent', () => {
  let component: CharacterAbilityInputComponent;
  let fixture: ComponentFixture<CharacterAbilityInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterAbilityInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterAbilityInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
