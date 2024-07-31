import { InventoryItem } from './inventory-item.model';
import { Spell } from './spell.model';

export interface Character {
  id: string;
  abilities: {
    str: {
      long: 'Strength';
      short: 'STR';
      value: number;
    };
    dex: {
      long: 'Dexterity';
      short: 'DEX';
      value: number;
    };
    wil: {
      long: 'Willpower';
      short: 'WIL';
      value: number;
    };
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
