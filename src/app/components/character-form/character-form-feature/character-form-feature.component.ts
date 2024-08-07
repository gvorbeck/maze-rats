import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CharacterFeatureOptionComponent } from './character-feature-option/character-feature-option.component';
import { Feature } from '../../../models/character.model';

@Component({
  selector: 'app-character-form-feature',
  templateUrl: './character-form-feature.component.html',
  styleUrls: ['./character-form-feature.component.scss'],
  standalone: true,
  imports: [FormsModule, CharacterFeatureOptionComponent, CommonModule],
})
export class CharacterFormFeatureComponent {
  @Output() featureChanged = new EventEmitter<Feature>();

  feature: Feature | null = null;
  path: Feature | null = null;

  onFeatureChange(feature: Feature) {
    console.log('Feature changed:', feature);

    if (feature !== 'path') {
      this.path = null; // Clear selected path if the feature is not 'path'
    }

    this.featureChanged.emit(feature);
  }

  onPathChange(path: Feature) {
    console.log('Path changed:', path);
    this.path = path;
    this.featureChanged.emit(path);
  }
}
