import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { Button } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { CharacterFormAbilitiesComponent } from '../character-form-abilities/character-form-abilities.component';
import { Character } from '../../models/character.model';

interface CharacterStepperPanel {
  header: string;
  instruction: string;
  component: Type<Component> | null;
}

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [StepperModule, Button, CommonModule],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.scss',
})
export class CharacterFormComponent {
  startingCharacter: Character = {
    id: '',
    abilities: {
      str: {
        long: 'Strength',
        short: 'STR',
        value: 0,
      },
      dex: {
        long: 'Dexterity',
        short: 'DEX',
        value: 0,
      },
      wil: {
        long: 'Willpower',
        short: 'WIL',
        value: 0,
      },
    },
    health: 0,
    feature: undefined,
    items: {
      hands: [],
      worn: [],
      belt: [],
      backpack: [],
      gold: 0,
    },
    details: {
      appearance: '',
      physical: '',
      background: '',
      clothing: '',
      personality: '',
      mannerism: '',
    },
    name: '',
    level: 1,
    xp: 0,
    magic: {
      slots: 0,
      spells: [],
    },
  };

  stepperPanels: CharacterStepperPanel[] = [
    {
      header: 'Roll or Choose Abilities',
      instruction:
        "Your PC has 3 abilities: Strength, Dexterity, and Will. Roll 1d to find their starting values, or simply choose a row (with GM permission). You may raise one of your PC's abilities by one point at levels 2, 4, and 6. A PC's abilities may never be raised higher than +4.",
      component: CharacterFormAbilitiesComponent,
    },
    {
      header: 'Record Maximum Health',
      instruction: 'bar',
      component: null,
    },
    {
      header: 'Choose Starting Feature',
      instruction: 'bar',
      component: null,
    },
    {
      header: 'Roll or Choose Six Items',
      instruction: 'bar',
      component: null,
    },
    {
      header: 'Choose Combat Gear',
      instruction: 'bar',
      component: null,
    },
    {
      header: 'Roll or Create Appearance',
      instruction: 'bar',
      component: null,
    },
    {
      header: 'Roll or Create Physical Detail',
      instruction: 'bar',
      component: null,
    },
    {
      header: 'Roll or Create Background',
      instruction: 'bar',
      component: null,
    },
    {
      header: 'Roll or Create Clothing',
      instruction: 'bar',
      component: null,
    },
    {
      header: 'Roll or Create Personality',
      instruction: 'bar',
      component: null,
    },
    {
      header: 'Roll or Create Mannerism',
      instruction: 'bar',
      component: null,
    },
    {
      header: 'Record Name',
      instruction: 'bar',
      component: null,
    },
  ];
}
