import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFormItemsComponent } from './character-form-items.component';

describe('CharacterFormItemsComponent', () => {
  let component: CharacterFormItemsComponent;
  let fixture: ComponentFixture<CharacterFormItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFormItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterFormItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
