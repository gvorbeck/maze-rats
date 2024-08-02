import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFeatureOptionComponent } from './character-feature-option.component';

describe('CharacterFeatureOptionComponent', () => {
  let component: CharacterFeatureOptionComponent;
  let fixture: ComponentFixture<CharacterFeatureOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFeatureOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterFeatureOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
