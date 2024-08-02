import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InventoryItem } from '../models/inventory-item.model';
import items from '../assets/items.json';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private itemsInventory: any[] = items;

  constructor() {}

  getInventoryItems(): Observable<InventoryItem[]> {
    return of(this.itemsInventory);
  }

  getStarterItems(): Observable<InventoryItem[]> {
    return of(this.itemsInventory.filter((item) => item.starter));
  }
}
