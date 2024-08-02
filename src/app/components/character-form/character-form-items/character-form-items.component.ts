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
  styleUrl: './character-form-items.component.scss',
})
export class CharacterFormItemsComponent {
  @Output() itemsChanged = new EventEmitter<InventoryItem[]>();

  availableItems: InventoryItem[] | undefined;
  selectedItems: InventoryItem[] | undefined;
  draggedItem: InventoryItem | undefined | null;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.selectedItems = [];
    this.inventoryService
      .getStarterItems()
      .subscribe((data: InventoryItem[]) => {
        this.availableItems = data;
      });
  }

  dragStart(item: InventoryItem) {
    this.draggedItem = item;
  }

  drop() {
    if (this.draggedItem) {
      let draggedItemIndex = this.findIndex(this.draggedItem);
      this.selectedItems = [
        ...(this.selectedItems as InventoryItem[]),
        this.draggedItem,
      ];
      this.availableItems = this.availableItems?.filter(
        (val, i) => i != draggedItemIndex
      );
      this.draggedItem = null;
    }
  }

  dragEnd() {
    this.draggedItem = null;
  }

  findIndex(item: InventoryItem) {
    let index = -1;
    for (let i = 0; i < (this.availableItems as InventoryItem[]).length; i++) {
      if (item.name === (this.availableItems as InventoryItem[])[i].name) {
        index = i;
        break;
      }
    }
    return index;
  }
}
