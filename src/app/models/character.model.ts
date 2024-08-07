import { InventoryItem } from './inventory-item.model';
import { Spell } from './spell.model';

export interface Ability {
  long: string;
  short: string;
  value: number | null;
}

export type Feature =
  | 'attack-bonus'
  | 'spell-slot'
  | 'briarborn'
  | 'fingersmith'
  | 'roofrunner'
  | 'shadowjack'
  | 'path'
  | null;

export type Details =
  | 'appearance'
  | 'physical'
  | 'background'
  | 'clothing'
  | 'personality'
  | 'mannerism';

export interface Character {
  id: string;
  abilities: {
    str: Ability;
    dex: Ability;
    wil: Ability;
  };
  health: number;
  feature: Feature;
  items: InventoryItem[];
  gold: number;
  details: {
    appearance: string;
    physical: string;
    background: string;
    clothing: string;
    personality: string;
    mannerism: string;
  };
  name: string;
  level: number;
  xp: number;
  magic: {
    slots: number;
    spells: Spell[];
  };
}

export type AbilityKey = keyof Character['abilities'];
