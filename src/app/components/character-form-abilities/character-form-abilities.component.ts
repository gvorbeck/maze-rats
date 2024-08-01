import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-character-form-abilities',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, TabViewModule],
  templateUrl: './character-form-abilities.component.html',
  styleUrls: ['./character-form-abilities.component.scss'],
})
export class CharacterFormAbilitiesComponent {
  // EventEmitter to notify the parent component of changes in abilities
  @Output() abilitiesChanged = new EventEmitter<any>();

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

  // Function to simulate a d6 roll (returns a number between 1 and 6)
  rollAbility(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Rolls a d6, finds the corresponding ability group, and selects it
  rollGroupAbilities() {
    const roll = this.rollAbility();
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

  // Emits the selected row data when a row is selected
  onRowSelect(event: any) {
    this.abilitiesChanged.emit(event.data);
  }
}