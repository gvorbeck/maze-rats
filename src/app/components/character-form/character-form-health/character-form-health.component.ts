import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-character-form-health',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './character-form-health.component.html',
  styleUrls: ['./character-form-health.component.scss'],
})
export class CharacterFormHealthComponent {
  @Output() healthChanged = new EventEmitter<number>();

  healthPoints: number = 4;

  updateHealth() {
    this.healthChanged.emit(this.healthPoints);
  }
}
