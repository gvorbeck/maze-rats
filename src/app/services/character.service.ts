import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  getUserCharacters(userId: string) {
    return this.firestore
      .collection('characters', (ref) => ref.where('userId', '==', userId))
      .snapshotChanges();
  }

  createCharacter(character: Character) {
    return this.firestore.collection('characters').add(character);
  }

  updateCharacter(id: string, character: Character) {
    return this.firestore.collection('characters').doc(id).update(character);
  }

  deleteCharacter(id: string) {
    return this.firestore.collection('characters').doc(id).delete();
  }
}
