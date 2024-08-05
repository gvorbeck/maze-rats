import { Component, Output, EventEmitter } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-character-form-name',
  standalone: true,
  imports: [FormsModule, InputTextModule, FloatLabelModule],
  templateUrl: './character-form-name.component.html',
  styleUrls: ['./character-form-name.component.scss'],
})
export class CharacterFormNameComponent {
  @Output() nameChanged = new EventEmitter<string>();

  name: string | undefined;

  onNameChange(name: string) {
    this.nameChanged.emit(name);
  }
}
