import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { Character, AbilityKey, Feature } from '../../models/character.model';
import { CharacterFormAbilitiesComponent } from './character-form-abilities/character-form-abilities.component';
import { CharacterFormHealthComponent } from './character-form-health/character-form-health.component';
import { CharacterFormFeatureComponent } from './character-form-feature/character-form-feature.component';
import { CharacterFormItemsComponent } from './character-form-items/character-form-items.component';
import { InventoryItem } from '../../models/inventory-item.model';
import { CharacterFormDetailsComponent } from './character-form-details/character-form-details.component';
import { CharacterFormNameComponent } from './character-form-name/character-form-name.component';

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
    CharacterFormFeatureComponent,
    CharacterFormItemsComponent,
    CharacterFormDetailsComponent,
    CharacterFormNameComponent,
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
        value: null,
      },
      dex: {
        long: 'Dexterity',
        short: 'DEX',
        value: null,
      },
      wil: {
        long: 'Willpower',
        short: 'WIL',
        value: null,
      },
    },
    health: 4,
    feature: null,
    items: [],
    gold: 0,
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
    // {
    //   header: 'Roll or Choose Abilities',
    //   instruction:
    //     "Your PC has 3 abilities: Strength, Dexterity, and Will. Roll 1d to find their starting values, or simply choose a row (with GM permission). You may raise one of your PC's abilities by one point at levels 2, 4, and 6. A PC's abilities may never be raised higher than +4.",
    //   component: CharacterFormAbilitiesComponent,
    //   name: 'abilities',
    // },
    // {
    //   header: 'Record Maximum Health',
    //   instruction:
    //     'Your PC begins with 4 maximum health and 4 current health. PCs add 2 to their maximum health (but not current health) each time they gain a level.',
    //   component: CharacterFormHealthComponent,
    //   name: 'health',
    // },
    // {
    //   header: 'Choose Starting Feature',
    //   instruction: 'Your PC begins with one of the following features:',
    //   component: CharacterFormFeatureComponent,
    //   name: 'feature',
    // },
    {
      header: 'Choose Starting Inventory',
      instruction:
        'Record the location of all items, armor, and weapons: hands, worn, belt, or backpack. Belts carry up to two items, and backpacks can carry as much as a backpack could reasonably fit. PCs start with: light armor (+1 armor), a shield (+1 armor, 1 hand), and two weapons.',
      component: CharacterFormItemsComponent,
      name: 'items',
    },
    {
      header: 'Create Details',
      instruction:
        "Describe your PC's appearance, including clothing, physical features, and mannerisms.",
      component: CharacterFormDetailsComponent,
      name: 'details',
    },
    {
      header: 'Name Your Character',
      instruction:
        'Your character starts at level 1 and has 0 XP. Give your character a name.',
      component: null,
      name: 'name',
    },
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

  onFeatureChanged(feature: Feature | 'path') {
    console.log('startingCharacter:', this.startingCharacter);
    if (feature === 'path') {
      this.startingCharacter.feature = null;
    } else {
      this.startingCharacter.feature = feature;
    }
  }

  onItemsChanged() {}

  onNameChanged(name: string) {
    this.startingCharacter.name = name;
    console.log('startingCharacter:', this.startingCharacter);
  }

  isNextDisabled(panelIndex: number): boolean {
    const panel = this.stepperPanels[panelIndex];
    let outcome = true;
    switch (panel.name) {
      case 'abilities':
        outcome =
          this.startingCharacter.abilities.str.value === null &&
          this.startingCharacter.abilities.dex.value === null &&
          this.startingCharacter.abilities.wil.value === null;
        break;
      case 'health':
        outcome =
          this.startingCharacter.health === 0 ||
          this.startingCharacter.health === null;
        break;
      case 'feature':
        outcome = this.startingCharacter.feature === null;
        break;
    }
    return outcome;
  }
}
