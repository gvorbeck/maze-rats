export type TypeName =
  | 'weapon'
  | 'armor'
  | 'item'
  | 'animal'
  | 'transport'
  | 'property'
  | 'hireling';

export interface InventoryItem {
  name: string;
  type: TypeName;
  armor?: number;
  slots: number | null;
  damage?: number;
  detail?: string;
  value: number | null;
  starter?: boolean;
  amount?: number | string;
}
