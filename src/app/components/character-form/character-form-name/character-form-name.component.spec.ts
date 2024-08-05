import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFormNameComponent } from './character-form-name.component';

describe('CharacterFormNameComponent', () => {
  let component: CharacterFormNameComponent;
  let fixture: ComponentFixture<CharacterFormNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFormNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterFormNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
