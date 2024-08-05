import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InventoryItem } from '../models/inventory-item.model';
import items from '../assets/items.json';
import weapons from '../assets/weapons.json';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private itemsInventory: any[] = items;
  private weaponsInventory: any[] = weapons;

  constructor() {}

  getInventoryItems(): Observable<InventoryItem[]> {
    return of(this.itemsInventory);
  }

  getStarterItems(): Observable<InventoryItem[]> {
    return of(this.itemsInventory.filter((item) => item.starter));
  }

  getLightWeapons(): Observable<InventoryItem[]> {
    return of(
      this.weaponsInventory.filter(
        (item) => item.starter && item.damage === 0 && item.slots === 1
      )
    );
  }

  getHeavyWeapons(): Observable<InventoryItem[]> {
    return of(
      this.weaponsInventory.filter(
        (item) => item.starter && item.damage === 1 && item.slots === 2
      )
    );
  }

  getRangedWeapons(): Observable<InventoryItem[]> {
    return of(
      this.weaponsInventory.filter(
        (item) => item.starter && item.damage === 0 && item.slots === 2
      )
    );
  }
}
