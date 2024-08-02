import { InventoryItem } from './inventory-item.model';
import { Spell } from './spell.model';

export interface Ability {
  long: string;
  short: string;
  value: number;
}

export type Feature =
  | 'attack-bonus'
  | 'spell-slot'
  | 'briarborn'
  | 'fingersmith'
  | 'roofrunner'
  | 'shadowjack'
  | 'path'
  | undefined;

export interface Character {
  id: string;
  abilities: {
    str: Ability;
    dex: Ability;
    wil: Ability;
  };
  health: number;
  feature: Feature;
  items: {
    hands: InventoryItem[];
    worn: InventoryItem[];
    belt: InventoryItem[];
    backpack: InventoryItem[];
    gold: number;
    unassigned: InventoryItem[];
  };
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
