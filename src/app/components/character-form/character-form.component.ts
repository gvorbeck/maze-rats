import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { CharacterFormAbilitiesComponent } from '../character-form-abilities/character-form-abilities.component';
import { Character } from '../../models/character.model';

interface CharacterStepperPanel {
  header: string;
  instruction: string;
  component: Type<any> | null;
}

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    CommonModule,
    CharacterFormAbilitiesComponent,
  ],
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
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
      instruction: 'Record your maximum health points.',
      component: null,
    },
    {
      header: 'Choose Starting Feature',
      instruction: 'Choose one starting feature from the list.',
      component: null,
    },
    {
      header: 'Roll or Choose Six Items',
      instruction: 'Roll or choose six items to start with.',
      component: null,
    },
    {
      header: 'Choose Combat Gear',
      instruction: 'Choose your combat gear.',
      component: null,
    },
    {
      header: 'Roll or Create Appearance',
      instruction: "Roll or create your character's appearance.",
      component: null,
    },
    {
      header: 'Roll or Create Physical Detail',
      instruction: 'Roll or create a physical detail for your character.',
      component: null,
    },
    {
      header: 'Roll or Create Background',
      instruction: 'Roll or create a background for your character.',
      component: null,
    },
    {
      header: 'Roll or Create Clothing',
      instruction: "Roll or create your character's clothing.",
      component: null,
    },
    {
      header: 'Roll or Create Personality',
      instruction: 'Roll or create a personality for your character.',
      component: null,
    },
    {
      header: 'Roll or Create Mannerism',
      instruction: 'Roll or create a mannerism for your character.',
      component: null,
    },
    {
      header: 'Record Name',
      instruction: "Record your character's name.",
      component: null,
    },
  ];

  onAbilitiesChanged(abilities: any) {
    this.startingCharacter.abilities.str.value = abilities.str;
    this.startingCharacter.abilities.dex.value = abilities.dex;
    this.startingCharacter.abilities.wil.value = abilities.wil;
  }
}
