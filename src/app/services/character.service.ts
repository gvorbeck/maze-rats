import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private characters: Character[] = [];

  constructor() {}

  // Read: Get all characters
  getCharacters(): Observable<Character[]> {
    return of(this.characters);
  }

  // Read: Get a single character by ID
  getCharacter(id: string): Observable<Character | undefined> {
    return of(this.characters.find((character) => character.id === id));
  }

  // Create: Add a new character
  addCharacter(character: Character): void {
    this.characters.push(character);
  }

  // Update: Modify an existing character
  updateCharacter(character: Character): void {
    const index = this.characters.findIndex((c) => c.id === character.id);
    if (index !== -1) {
      this.characters[index] = character;
    }
  }

  // Delete: Remove a character by ID
  deleteCharacter(id: string): void {
    this.characters = this.characters.filter(
      (character) => character.id !== id
    );
  }
}
