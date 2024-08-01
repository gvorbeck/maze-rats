import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFormAbilitiesComponent } from './character-form-abilities.component';

describe('CharacterFormAbilitiesComponent', () => {
  let component: CharacterFormAbilitiesComponent;
  let fixture: ComponentFixture<CharacterFormAbilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFormAbilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterFormAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
