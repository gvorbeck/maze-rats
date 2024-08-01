import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFormHealthComponent } from './character-form-health.component';

describe('CharacterFormHealthComponent', () => {
  let component: CharacterFormHealthComponent;
  let fixture: ComponentFixture<CharacterFormHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFormHealthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterFormHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
