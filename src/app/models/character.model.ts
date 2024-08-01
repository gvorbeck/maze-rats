import { InventoryItem } from './inventory-item.model';
import { Spell } from './spell.model';

export interface Ability {
  long: string;
  short: string;
  value: number;
}

export interface Character {
  id: string;
  abilities: {
    str: Ability;
    dex: Ability;
    wil: Ability;
  };
  health: number;
  feature:
    | undefined
    | 'briarborn'
    | 'fingersmith'
    | 'roofrunner'
    | 'shadowjack';
  items: {
    hands: InventoryItem[];
    worn: InventoryItem[];
    belt: InventoryItem[];
    backpack: InventoryItem[];
    gold: number;
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
