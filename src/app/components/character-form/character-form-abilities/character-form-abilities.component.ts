import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { AbilityKey } from '../../../models/character.model';

@Component({
  selector: 'app-character-form-abilities',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    TabViewModule,
    InputNumberModule,
    FormsModule,
  ],
  templateUrl: './character-form-abilities.component.html',
  styleUrls: ['./character-form-abilities.component.scss'],
})
export class CharacterFormAbilitiesComponent {
  // EventEmitter to notify the parent component of changes in abilities
  @Output() abilitiesChanged = new EventEmitter<any>();
  @Output() abilityChanged = new EventEmitter<{
    stat: AbilityKey;
    value: number;
  }>();

  // Predefined table of ability values corresponding to a d6 roll
  abilityTable = [
    { id: 1, str: 2, dex: 1, wil: 0 },
    { id: 2, str: 2, dex: 0, wil: 1 },
    { id: 3, str: 1, dex: 2, wil: 0 },
    { id: 4, str: 0, dex: 2, wil: 1 },
    { id: 5, str: 1, dex: 0, wil: 2 },
    { id: 6, str: 0, dex: 1, wil: 2 },
  ];

  // Holds the selected ability group after a roll
  selectedAbilityGroup: any;

  rollInput: number = 0;
  strInput: number = 0;
  dexInput: number = 0;
  wilInput: number = 0;

  // Function to simulate a d6 roll (returns a number between 1 and 6)
  rollAbility(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Rolls a d6, finds the corresponding ability group, and selects it
  rollGroupAbilities() {
    const roll = this.rollAbility();
    this.rollInput = roll;
    const newAbilities = this.abilityTable.find(
      (ability) => ability.id === roll
    );
    if (newAbilities) {
      // Updates the selected ability group
      this.selectedAbilityGroup = newAbilities;
      // Emits the selected ability group to notify the parent component
      this.abilitiesChanged.emit(this.selectedAbilityGroup);
    }
  }

  // Handles input number changes and updates the selected ability group
  onRollInputChange(value: number) {
    this.rollInput = value;
    const newAbilities = this.abilityTable.find(
      (ability) => ability.id === value
    );
    if (newAbilities) {
      console.log(newAbilities);
      this.selectedAbilityGroup = newAbilities;
      this.abilitiesChanged.emit(this.selectedAbilityGroup);
    }
  }

  onRollStatChange(value: number, stat: AbilityKey) {
    console.log(value, stat);
    if (stat === 'str') {
      this.strInput = value;
    }
    if (stat === 'dex') {
      this.dexInput = value;
    }
    if (stat === 'wil') {
      this.wilInput = value;
    }
    // Emit the specific stat and value
    this.abilityChanged.emit({ stat, value });
  }

  // Emits the selected row data when a row is selected
  onRowSelect(event: any) {
    this.rollInput = event.data.id;
    this.abilitiesChanged.emit(event.data);
  }
}
