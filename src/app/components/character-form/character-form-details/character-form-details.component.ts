import { Component } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

type Details =
  | 'appearance'
  | 'physical'
  | 'background'
  | 'clothing'
  | 'personality'
  | 'mannerism';

@Component({
  selector: 'app-character-form-details',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RadioButtonModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './character-form-details.component.html',
  styleUrls: ['./character-form-details.component.scss'],
})
export class CharacterFormDetailsComponent {
  details: { [key in Details]: string } = {
    appearance: '',
    physical: '',
    background: '',
    clothing: '',
    personality: '',
    mannerism: '',
  };

  detailsForm = [
    {
      label: 'Appearance',
      name: 'appearance' as Details,
      options: [
        'Aquiline',
        'Athletic',
        'Barrel-Chested',
        'Boney',
        'Brawney',
        'Brutish',
        'Bullnecked',
        'Chiseled',
        'Coltish',
        'Corpulent',
        'Craggy',
        'Delicate',
        'Furrowed',
        'Gaunt',
        'Gorgeous',
        'Grizzled',
        'Haggard',
        'Handsome',
        'Hideous',
        'Lanky',
        'Pudgy',
        'Ripped',
        'Rosy',
        'Scrawny',
        'Sinewy',
        'Slender',
        'Slumped',
        'Solid',
        'Square-Jawed',
        'Statuesque',
        'Towering',
        'Trim',
        'Weathered',
        'Willowy',
        'Wiry',
        'Wrinkled',
      ],
    },
    {
      label: 'Physical',
      name: 'physical' as Details,
      options: [
        'Acid scars',
        'Battle scars',
        'Birthmark',
        'Braided hair',
        'Brand mark',
        'Broken nose',
        'Bronze skinned',
        'Burn scars',
        'Bushy eyebrows',
        'Curly hair',
        'Dark skinned',
        'Dreadlocks',
        'Exotic accent',
        'Flogging scars',
        'Freckles',
        'Gold tooth',
        'Hoarse voice',
        'Huge beard',
        'Long hair',
        'Matted hair',
        'Missing ear',
        'Missing teeth',
        'Mustache',
        'Muttonchops',
        'Nine fingers',
        'Oiled hair',
        'One-eyed',
        'Pale skinned',
        'Piercings',
        'Ritual scars',
        'Sallow skin',
        'Shaved head',
        'Sunburned',
        'Tangled hair',
        'Tattoos',
        'Topknot',
      ],
    },
    {
      label: 'Background',
      name: 'background' as Details,
      options: [],
    },
    {
      label: 'Clothing',
      name: 'clothing' as Details,
      options: [],
    },
    {
      label: 'Personality',
      name: 'personality' as Details,
      options: [],
    },
    {
      label: 'Mannerism',
      name: 'mannerism' as Details,
      options: [],
    },
  ];

  onRadioChange(event: any, name: Details) {
    this.details[name] = event.value;
  }

  randomize(detailName: Details, options: string[]) {
    if (options.length > 0) {
      const randomOption = options[Math.floor(Math.random() * options.length)];
      this.details[detailName] = randomOption;
    }
  }
}
