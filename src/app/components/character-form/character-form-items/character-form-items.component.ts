import { Component, Output, EventEmitter } from '@angular/core';
import { InventoryItem } from '../../../models/inventory-item.model';
import { InventoryService } from '../../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';

@Component({
  selector: 'app-character-form-items',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './character-form-items.component.html',
  styleUrls: ['./character-form-items.component.scss'],
})
export class CharacterFormItemsComponent {
  @Output() itemsChanged = new EventEmitter<{
    hands: InventoryItem[];
    belt: InventoryItem[];
    worn: InventoryItem[];
    backpack: InventoryItem[];
  }>();

  availableItems: InventoryItem[] = [];
  selectedItems: InventoryItem[] = [];
  itemsDisabled: boolean = false;
  draggedItem: InventoryItem | null = null;

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
}
