import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-character-feature-option',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioButtonModule],
  templateUrl: './character-feature-option.component.html',
  styleUrls: ['./character-feature-option.component.scss'],
})
export class CharacterFeatureOptionComponent {
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() model: any;
  @Input() inputId: string = '';
  @Input() label: string = '';
  @Output() modelChange = new EventEmitter<any>();

  onModelChange(event: any) {
    this.model = event;
    this.modelChange.emit(event);
  }
}
