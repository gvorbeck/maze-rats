import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../models/character.model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    if (typeof window !== 'undefined' && localStorage) {
      const storedCharacters = localStorage.getItem('characters');
      if (storedCharacters) {
        this.characters = JSON.parse(storedCharacters);
      }
    } else {
      console.warn('localStorage is not available');
    }
  }
}
