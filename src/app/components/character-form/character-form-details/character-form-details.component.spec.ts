import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFormDetailsComponent } from './character-form-details.component';

describe('CharacterFormDetailsComponent', () => {
  let component: CharacterFormDetailsComponent;
  let fixture: ComponentFixture<CharacterFormDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFormDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
