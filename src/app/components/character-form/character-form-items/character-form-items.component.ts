import { Component, Output, EventEmitter } from '@angular/core';
import { InventoryItem } from '../../../models/inventory-item.model';
import { InventoryService } from '../../../services/inventory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-form-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-form-items.component.html',
  styleUrl: './character-form-items.component.scss',
})
export class CharacterFormItemsComponent {
  @Output() itemsChanged = new EventEmitter<InventoryItem[]>();

  items: InventoryItem[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService
      .getStarterItems()
      .subscribe((data: InventoryItem[]) => {
        this.items = data;
      });
  }
}
