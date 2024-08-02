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
  armor?: number;
  slots: number | null;
  damage?: number;
  detail?: string;
  value: number | null;
  starter?: boolean;
  amount?: number | string;
}
