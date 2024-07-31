export interface InventoryItem {
  name: string;
  type:
    | 'weapon'
    | 'armor'
    | 'item'
    | 'animal'
    | 'transport'
    | 'property'
    | 'hireling';
  armor: number | undefined;
  hands: number | undefined;
  damage: number | undefined;
  detail: string | undefined;
  value: number | undefined;
}
