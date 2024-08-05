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

  availableItems: InventoryItem[] | undefined;
  handsItems: InventoryItem[] = [];
  beltItems: InventoryItem[] = [];
  wornItems: InventoryItem[] = [];
  backpackItems: InventoryItem[] = [];
  draggedItem: InventoryItem | undefined | null;

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

  drop(area: string) {
    if (this.draggedItem) {
      let draggedItemIndex = this.findIndex(this.draggedItem);
      switch (area) {
        case 'hands':
          this.handsItems.push(this.draggedItem);
          break;
        case 'belt':
          this.beltItems.push(this.draggedItem);
          break;
        case 'worn':
          this.wornItems.push(this.draggedItem);
          break;
        case 'backpack':
          this.backpackItems.push(this.draggedItem);
          break;
      }
      this.availableItems = this.availableItems?.filter(
        (val, i) => i !== draggedItemIndex
      );
      this.itemsChanged.emit(this.getAllSelectedItems());
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

  getAllSelectedItems(): {
    hands: InventoryItem[];
    belt: InventoryItem[];
    worn: InventoryItem[];
    backpack: InventoryItem[];
  } {
    return {
      hands: this.handsItems,
      belt: this.beltItems,
      worn: this.wornItems,
      backpack: this.backpackItems,
    };
  }
}
