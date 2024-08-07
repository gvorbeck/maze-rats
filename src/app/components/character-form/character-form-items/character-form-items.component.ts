import { Component, Output, EventEmitter } from '@angular/core';
import { InventoryItem } from '../../../models/inventory-item.model';
import { InventoryService } from '../../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

type Weapon = 'light-weapon' | 'heavy-weapon' | 'ranged-weapon';
type Location = 'hands' | 'belt' | 'worn' | 'backpack';

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

  lightWeapon = 'light-weapon';
  heavyWeapon = 'heavy-weapon';
  rangedWeapon = 'ranged-weapon';
  belt = 'belt';
  hands = 'hands';
  worn = 'worn';
  backpack = 'backpack';

  availableItems: InventoryItem[] = [];
  selectedItems: InventoryItem[] = [];
  itemsDisabled: boolean = false;
  draggedItem: InventoryItem | null = null;
  dropdownOptions: string[] = [this.hands, this.belt, this.worn, this.backpack];
  weaponDropdownOptions: string[] = [
    this.lightWeapon,
    this.heavyWeapon,
    this.rangedWeapon,
  ];
  errorMessages: string[] = [];
  numWeapons = 0;
  weapon = {
    name: '',
    type: null,
    location: null,
  };

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
    const nonWeaponItems = this.selectedItems.filter(
      (item) =>
        item.type !== this.lightWeapon &&
        item.type !== this.heavyWeapon &&
        item.type !== this.rangedWeapon
    );
    if (source === 'items') {
      this.itemsDisabled = nonWeaponItems.length >= 6;
    }
  }

  onLocationChange(item: InventoryItem, location: string) {
    const exceedsHandsCapacity = this.getTotalSlots(this.hands) > 2;

    const currentBeltItems = this.selectedItems.filter(
      (i) => i.location === this.belt
    ).length;
    const newBeltItems = currentBeltItems + (location === this.belt ? 1 : 0);
    const exceedsBeltCapacity = newBeltItems > 2;

    this.errorMessages = [];

    if (location === this.hands && exceedsHandsCapacity) {
      this.errorMessages.push('Too many items in hands');
    }

    if (location === this.belt && exceedsBeltCapacity) {
      this.errorMessages.push('Cannot assign more than 2 items to belt.');
    }

    if (this.errorMessages.length === 0) {
      // Update item location
      const selectedItem = this.selectedItems.find((i) => i.name === item.name);
      if (selectedItem) {
        selectedItem.location = location as Location;
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
    const handsSlots = this.getTotalSlots(this.hands);
    const beltItems = this.selectedItems.filter(
      (item) => item.location === this.belt
    ).length;
    this.errorMessages = [];
    if (handsSlots > 2) {
      this.errorMessages.push('Cannot assign more than 2 slots to hands.');
    }
    if (beltItems > 2) {
      this.errorMessages.push('Cannot assign more than 2 items to belt.');
    }
    this.numWeapons = this.selectedItems.filter(
      (item) =>
        item.type === this.lightWeapon ||
        item.type === this.heavyWeapon ||
        item.type === this.rangedWeapon
    ).length;
  }

  addWeapon(weapon: {
    name: string;
    type: string | null;
    location: string | null;
  }) {
    const slots = weapon.type === this.lightWeapon ? 1 : 2;
    const damage = weapon.type === this.heavyWeapon ? 1 : 0;

    const newWeapon: InventoryItem = {
      name: weapon.name,
      type: weapon.type as Weapon,
      slots,
      damage,
      value: null,
      location: weapon.location as Location,
    };

    this.selectedItems.push(newWeapon);
    this.validateInventory();
    this.itemsChanged.emit(this.selectedItems);
  }

  validateWeapon() {
    let invalid = false;
    if (
      this.weapon.name === '' ||
      this.weapon.type === null ||
      this.weapon.location === null ||
      this.numWeapons >= 2
    ) {
      invalid = true;
    }

    return invalid;
  }
}
