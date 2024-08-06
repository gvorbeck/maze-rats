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
  selectedItems: InventoryItem[] = [];
  itemsDisabled: boolean = false;
  draggedItem: InventoryItem | undefined | null;
  // maxItems: number = 6;
  // availableLightWeapons: InventoryItem[] | undefined;
  // availableHeavyWeapons: InventoryItem[] | undefined;
  // availableRangedWeapons: InventoryItem[] | undefined;
  // handsItems: InventoryItem[] = [];
  // beltItems: InventoryItem[] = [];
  // wornItems: InventoryItem[] = [];
  // backpackItems: InventoryItem[] = [];
  // draggedItem: InventoryItem | undefined | null;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService
      .getStarterItems()
      .subscribe((data: InventoryItem[]) => {
        this.availableItems = data;
      });
    // this.inventoryService
    //   .getLightWeapons()
    //   .subscribe((data: InventoryItem[]) => {
    //     this.availableLightWeapons = data;
    //   });
    // this.inventoryService
    //   .getHeavyWeapons()
    //   .subscribe((data: InventoryItem[]) => {
    //     this.availableHeavyWeapons = data;
    //   });
    // this.inventoryService
    //   .getRangedWeapons()
    //   .subscribe((data: InventoryItem[]) => {
    //     this.availableRangedWeapons = data;
    //   });
  }

  dragStart(item: InventoryItem) {
    this.draggedItem = item;
  }

  dragEnd() {
    this.draggedItem = null;
  }

  drop(refund?: boolean) {
    if (!refund) {
      if (this.draggedItem && !this.itemsDisabled) {
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
    } else {
      // remove from selectedItems and add it back to availableItems
    }
    this.isDisabled('items');
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

  isDisabled(source: 'items' | 'weapons') {
    if (source === 'items') {
      this.itemsDisabled = this.selectedItems.length >= 6;
      console.log('itemsDisabled:', this.itemsDisabled);
    }
  }

  // dragStart(item: InventoryItem) {
  //   // this.draggedItem = item;
  // }

  // drop(area: string) {
  //   // if (this.draggedItem && this.getTotalItems() < this.maxItems) {
  //   //   let draggedItemIndex = this.findIndex(this.draggedItem);
  //   //   switch (area) {
  //   //     case 'hands':
  //   //       this.handsItems.push(this.draggedItem);
  //   //       break;
  //   //     case 'belt':
  //   //       this.beltItems.push(this.draggedItem);
  //   //       break;
  //   //     case 'worn':
  //   //       this.wornItems.push(this.draggedItem);
  //   //       break;
  //   //     case 'backpack':
  //   //       this.backpackItems.push(this.draggedItem);
  //   //       break;
  //   //   }
  //   //   this.availableItems = this.availableItems?.filter(
  //   //     (val, i) => i !== draggedItemIndex
  //   //   );
  //   //   this.itemsChanged.emit(this.getAllSelectedItems());
  //   //   this.draggedItem = null;
  //   // }
  // }

  // dragEnd() {
  //   // this.draggedItem = null;
  // }

  // findIndex(item: InventoryItem) {
  //   // let index = -1;
  //   // for (let i = 0; i < (this.availableItems as InventoryItem[]).length; i++) {
  //   //   if (item.name === (this.availableItems as InventoryItem[])[i].name) {
  //   //     index = i;
  //   //     break;
  //   //   }
  //   // }
  //   // return index;
  // }

  // getAllSelectedItems(): {
  // //   hands: InventoryItem[];
  // //   belt: InventoryItem[];
  // //   worn: InventoryItem[];
  // //   backpack: InventoryItem[];
  // // } {
  // //   return {
  // //     hands: this.handsItems,
  // //     belt: this.beltItems,
  // //     worn: this.wornItems,
  // //     backpack: this.backpackItems,
  // //   };
  // }

  // getTotalItems(): number {
  //   // return (
  //   //   this.handsItems.length +
  //   //   this.beltItems.length +
  //   //   this.wornItems.length +
  //   //   this.backpackItems.length
  //   // );
  // }

  // isDraggable(): boolean {
  //   // return this.getTotalItems() < this.maxItems;
  // }

  // onItemReturn(item: InventoryItem) {
  //   // if (!this.availableItems?.includes(item)) {
  //   //   this.availableItems?.push(item);
  //   // }
  // }
}
