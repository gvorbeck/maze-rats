import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-character-form-health',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputNumberModule],
  templateUrl: './character-form-health.component.html',
  styleUrls: ['./character-form-health.component.scss'],
})
export class CharacterFormHealthComponent {
  @Output() healthChanged = new EventEmitter<number>();

  healthPoints: number = 4;

  onUpdateHealth() {
    this.healthChanged.emit(this.healthPoints);
  }
}
