import { Component, Output, EventEmitter } from '@angular/core';
import { InventoryItem } from '../../../models/inventory-item.model';
import { InventoryService } from '../../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-character-form-items',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
  ],
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
  weaponDropdownOptions: string[] = [
    'light-weapon',
    'heavy-weapon',
    'ranged-weapon',
  ];
  errorMessages: string[] = [];

  weapon1 = { name: '', type: 'light-weapon', location: 'hands' };
  weapon2 = { name: '', type: 'light-weapon', location: 'hands' };

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
      this.validateInventory();
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
    const exceedsHandsCapacity = this.getTotalSlots('hands') > 2;

    const currentBeltItems = this.selectedItems.filter(
      (i) => i.location === 'belt'
    ).length;
    const newBeltItems = currentBeltItems + (location === 'belt' ? 1 : 0);
    const exceedsBeltCapacity = newBeltItems > 2;

    this.errorMessages = [];

    if (location === 'hands' && exceedsHandsCapacity) {
      this.errorMessages.push('Cannot assign more than 2 slots to hands.');
    }

    if (location === 'belt' && exceedsBeltCapacity) {
      this.errorMessages.push('Cannot assign more than 2 items to belt.');
    }

    if (this.errorMessages.length === 0) {
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
      this.validateInventory();
    }
  }

  getTotalSlots(location: string): number {
    return this.selectedItems
      .filter((item) => item.location === location)
      .reduce((total, item) => total + item.slots!, 0);
  }

  validateInventory() {
    const handsSlots = this.getTotalSlots('hands');
    const beltItems = this.selectedItems.filter(
      (item) => item.location === 'belt'
    ).length;
    this.errorMessages = [];
    if (handsSlots > 2) {
      this.errorMessages.push('Cannot assign more than 2 slots to hands.');
    }
    if (beltItems > 2) {
      this.errorMessages.push('Cannot assign more than 2 items to belt.');
    }
  }

  addWeapon(weapon: { name: string; type: string; location: string }) {
    const slots = weapon.type === 'light-weapon' ? 1 : 2;
    const damage = weapon.type === 'heavy-weapon' ? 1 : 0;

    const newWeapon: InventoryItem = {
      name: weapon.name,
      type: weapon.type as 'light-weapon' | 'heavy-weapon' | 'ranged-weapon',
      slots,
      damage,
      value: null,
      location: weapon.location as 'hands' | 'belt' | 'worn' | 'backpack',
    };

    this.selectedItems.push(newWeapon);
    this.itemsChanged.emit(this.selectedItems);
  }
}
