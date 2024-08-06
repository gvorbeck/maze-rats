import { Component, Output, EventEmitter } from '@angular/core';
import { InventoryItem } from '../../../models/inventory-item.model';
import { InventoryService } from '../../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-form-items',
  standalone: true,
  imports: [CommonModule, DragDropModule, DropdownModule, FormsModule],
  templateUrl: './character-form-items.component.html',
  styleUrls: ['./character-form-items.component.scss'],
})
export class CharacterFormItemsComponent {
  @Output() itemsChanged = new EventEmitter<InventoryItem[]>();

  availableItems: InventoryItem[] = [];
  selectedItems: InventoryItem[] = [];
  itemsDisabled: boolean = false;
  draggedItem: InventoryItem | null = null;
  dropdownOptions = ['hands', 'belt', 'worn', 'backpack'];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService
      .getStarterItems()
      .subscribe((data: InventoryItem[]) => {
        this.availableItems = data;
      });
  }

  dragStart(item: InventoryItem) {
    this.draggedItem = item;
  }

  dragEnd() {
    this.draggedItem = null;
  }

  drop(refund?: boolean) {
    if (this.draggedItem) {
      if (!refund) {
        if (!this.itemsDisabled) {
          this.draggedItem.location = 'unassigned';
          this.moveItem(
            this.draggedItem,
            this.availableItems,
            this.selectedItems
          );
        }
      } else {
        this.moveItem(
          this.draggedItem,
          this.selectedItems,
          this.availableItems
        );
      }
      this.draggedItem = null;
      this.isDisabled('items');
      // Emit updated items
      this.itemsChanged.emit(this.selectedItems);
    }
  }

  moveItem(item: InventoryItem, from: InventoryItem[], to: InventoryItem[]) {
    const index = from.findIndex((i) => i.name === item.name);
    if (index !== -1) {
      to.push(item);
      from.splice(index, 1);
    }
  }

  isDisabled(source: 'items' | 'weapons') {
    if (source === 'items') {
      this.itemsDisabled = this.selectedItems.length >= 6;
    }
  }

  updateItemLocation(
    item: InventoryItem,
    location: 'hands' | 'belt' | 'worn' | 'backpack'
  ) {
    // Ensure belt can only have 2 items
    if (
      location === 'belt' &&
      this.selectedItems.filter((i) => i.location === 'belt').length >= 2
    ) {
      return;
    }

    // Ensure hands can only hold items with a total of 2 slots
    const handSlots = this.selectedItems
      .filter((i) => i.location === 'hands')
      .reduce((acc, i) => acc + (i.slots || 0), 0);
    if (location === 'hands' && handSlots + (item.slots || 0) > 2) {
      return;
    }

    item.location = location;
    this.itemsChanged.emit(this.selectedItems); // Emit updated items
  }
}
