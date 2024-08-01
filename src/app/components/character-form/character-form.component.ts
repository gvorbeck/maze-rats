import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { Character, AbilityKey } from '../../models/character.model';
import { CharacterFormAbilitiesComponent } from './character-form-abilities/character-form-abilities.component';
import { CharacterFormHealthComponent } from './character-form-health/character-form-health.component';

interface CharacterStepperPanel {
  header: string;
  instruction: string;
  component: Type<any> | null;
  name: string;
}

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    CommonModule,
    CharacterFormAbilitiesComponent,
    CharacterFormHealthComponent,
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
      name: 'abilities',
    },
    {
      header: 'Record Maximum Health',
      instruction: 'Record your maximum health points.',
      component: CharacterFormHealthComponent,
      name: 'health',
    },
    // Add more panels as needed
  ];

  onAbilitiesChanged(abilities: any) {
    this.startingCharacter.abilities.str.value = abilities.str;
    this.startingCharacter.abilities.dex.value = abilities.dex;
    this.startingCharacter.abilities.wil.value = abilities.wil;
    console.log('startingCharacter:', this.startingCharacter);
  }

  onAbilityChanged({ stat, value }: { stat: AbilityKey; value: number }) {
    if (this.startingCharacter.abilities[stat]) {
      this.startingCharacter.abilities[stat].value = value;
      console.log('startingCharacter:', this.startingCharacter);
    }
  }

  onHealthChanged(health: number) {
    this.startingCharacter.health = health;
    console.log('startingCharacter:', this.startingCharacter);
  }
}
