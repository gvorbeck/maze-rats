import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFormFeatureComponent } from './character-form-feature.component';

describe('CharacterFormFeatureComponent', () => {
  let component: CharacterFormFeatureComponent;
  let fixture: ComponentFixture<CharacterFormFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFormFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterFormFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
