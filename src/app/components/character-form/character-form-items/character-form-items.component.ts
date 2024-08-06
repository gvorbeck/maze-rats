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
  dropdownOptions: string[] = ['hands', 'belt', 'worn', 'backpack'];

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

  onLocationChange(item: InventoryItem, location: string) {
    const currentHandsSlots = this.getTotalSlots('hands');
    const newHandsSlots =
      currentHandsSlots + (location === 'hands' ? item.slots! : 0);
    const exceedsHandsCapacity = newHandsSlots > 2;

    if (location === 'hands' && exceedsHandsCapacity) {
      // Display an error message or handle the restriction as needed
      console.error('Cannot assign more than 2 slots to hands.');
      return;
    }

    // Update item location
    const selectedItem = this.selectedItems.find((i) => i.name === item.name);
    if (selectedItem) {
      selectedItem.location = location as
        | 'hands'
        | 'belt'
        | 'worn'
        | 'backpack';
    }

    // Emit updated items list
    this.itemsChanged.emit(this.selectedItems);
  }

  getTotalSlots(location: string): number {
    return this.selectedItems
      .filter((item) => item.location === location)
      .reduce((total, item) => total + item.slots!, 0);
  }
}
