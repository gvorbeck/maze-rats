import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-character-ability-input',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule, ButtonModule],
  templateUrl: './character-ability-input.component.html',
  styleUrls: ['./character-ability-input.component.scss'],
})
export class CharacterAbilityInputComponent {
  @Input() label: string = '';
  @Input() value: number = 0;
  @Input() modifier: number | null = null;
  @Output() valueChange = new EventEmitter<number>();

  // Method to simulate rolling a D6 die
  rollDie(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Method to handle the button click event
  onRollClick() {
    this.value = this.rollDie();
    this.onValueChange(this.value);
  }

  // Method to handle the value change event
  onValueChange(value: number) {
    this.valueChange.emit(value);
  }
}
