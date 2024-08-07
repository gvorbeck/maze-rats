import { Component, EventEmitter, Output } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Details } from '../../../models/character.model';

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
  @Output() detailsChanged = new EventEmitter<{ [key in Details]: string }>();

  details: { [key in Details]: string } = {
    appearance: '',
    physical: '',
    background: '',
    clothing: '',
    personality: '',
    mannerism: '',
  };

  selectedMode: { [key in Details]: string } = {
    appearance: 'manual',
    physical: 'manual',
    background: 'manual',
    clothing: 'manual',
    personality: 'manual',
    mannerism: 'manual',
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
      options: [
        'Alchemist',
        'Beggar-prince',
        'Blackmailer',
        'Bounty-hunter',
        'Chimney sweep',
        'Coin-clipper',
        'Contortionist',
        'Counterfeiter',
        'Cultist',
        'Cutpurse',
        'Debt-collector',
        'Deserter',
        'Fence',
        'Fortuneteller',
        'Galley slave',
        'Gambler',
        'Gravedigger',
        'Headsman',
        'Hedge knight',
        'Highwayman',
        'Housebreaker',
        'Kidnapper',
        'Mad prophet',
        'Mountebank',
        'Peddler',
        'Pit-fighter',
        'Poisoner',
        'Rat-catcher',
        'Scrivener',
        'Sellsword',
        'Slave',
        'Smuggler',
        'Street performer',
        'Tattooist',
        'Urchin',
        'Usurer',
      ],
    },
    {
      label: 'Clothing',
      name: 'clothing' as Details,
      options: [
        'Antique',
        'Battle-torn',
        'Bedraggled',
        'Blood-stained',
        'Ceremonial',
        'Dated',
        'Decaying',
        'Eccentric',
        'Elegant',
        'Embroidered',
        'Exotic',
        'Fashionable',
        'Flamboyant',
        'Food-stained',
        'Formal',
        'Frayed',
        'Frumpy',
        'Garish',
        'Grimy',
        'Haute couture',
        'Lacey',
        'Livery',
        'Mud-stained',
        'Ostentatious',
        'Oversized',
        'Patched',
        'Patterned',
        'Perfumed',
        'Practical',
        'Rumpled',
        'Sigils',
        'Singed',
        'Tasteless',
        'Undersized',
        'Wine-stained',
      ],
    },
    {
      label: 'Personality',
      name: 'personality' as Details,
      options: [
        'Bitter',
        'Brave',
        'Cautious',
        'Chipper',
        'Contrary',
        'Cowardly',
        'Cunning',
        'Driven',
        'Entitled',
        'Gregarious',
        'Grumpy',
        'Heartless',
        'Honor-bound',
        'Hotheaded',
        'Inquisitive',
        'Irascible',
        'Jolly',
        'Know-it-all',
        'Lazy',
        'Loyal',
        'Menacing',
        'Mopey',
        'Nervous',
        'Protective',
        'Righteous',
        'Rude',
        'Sarcastic',
        'Savage',
        'Scheming',
        'Serene',
        'Spacey',
        'Stoic',
        'Stubborn',
        'Stuck-up',
        'Suspicious',
        'Wisecracking',
      ],
    },
    {
      label: 'Mannerism',
      name: 'mannerism' as Details,
      options: [
        'Anecdotes',
        'Breathy',
        'Chuckles',
        'Clipped',
        'Cryptic',
        'Deep voice',
        'Drawl',
        'Enunciates',
        'Flowery speech',
        'Gravelly voice',
        'Highly formal',
        'Hypnotic',
        'Interrupts',
        'Laconic',
        'Laughs',
        'Long pauses',
        'Melodious',
        'Monotone',
        'Mumbles',
        'Narrates',
        'Overly casual',
        'Quaint sayings',
        'Rambles',
        'Random facts',
        'Rapid-fire',
        'Rhyming',
        'Robotic',
        'Slow speech',
        'Speechifies',
        'Squeaky',
        'Street slang',
        'Stutters',
        'Talks to self',
        'Trails off',
        'Very loud',
        'Whispers',
      ],
    },
  ];

  onRadioChange(event: any, name: Details, mode: string) {
    this.selectedMode[name] = mode;
    this.emitDetails();
  }

  onInputChange(detailName: Details, value: string) {
    this.details[detailName] = value;
    this.selectedMode[detailName] = 'manual';
    this.emitDetails();
  }

  onDropdownChange(event: any, detailName: Details) {
    this.details[detailName] = event.value;
    this.selectedMode[detailName] = 'random';
    this.emitDetails();
  }

  randomize(detailName: Details, options: string[]) {
    if (options.length > 0) {
      const randomOption = options[Math.floor(Math.random() * options.length)];
      this.details[detailName] = randomOption;
      this.selectedMode[detailName] = 'random';
      this.emitDetails();
    }
  }

  emitDetails() {
    this.detailsChanged.emit(this.details);
  }
}
