import { Component } from '@angular/core';

@Component({
  selector: 'app-character-form-abilities',
  standalone: true,
  imports: [],
  templateUrl: './character-form-abilities.component.html',
  styleUrl: './character-form-abilities.component.scss',
})
export class CharacterFormAbilitiesComponent {}
// I think I'll need to use @Output to send the rolled abilities back to the parent component.
/* 
This component will consist of:
- A Tabbed interface with two tabs:
  - Default tab for Group Ability Rolls
  - A second tab for Individual Ability Rolls
On Group Ability Rolls:
- A p-button to roll all abilities
- A p-table that uses row selection (https://primeng.org/table#single-selection) that auto-selects a row when the user clicks the roll button. A user can click an individual row to select it. The startingCharacter object from the CharacterFormComponent will be updated when either the button is clicked or a row is selected.
On Individual Ability Rolls:
- A p-button to roll each ability individually
- A p-table that uses row selection that auto-selects a row when the user clicks the roll button. A user can click an individual row to select it. The startingCharacter object from the CharacterFormComponent will be updated when either the button is clicked or a row is selected.
*/
