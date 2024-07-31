import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [StepperModule, Button],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.scss',
})
export class CharacterFormComponent {}
