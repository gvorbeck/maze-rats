import { Component, Output, EventEmitter } from '@angular/core';
import { InventoryItem } from '../../../models/inventory-item.model';

@Component({
  selector: 'app-character-form-items',
  standalone: true,
  imports: [],
  templateUrl: './character-form-items.component.html',
  styleUrl: './character-form-items.component.scss',
})
export class CharacterFormItemsComponent {
  @Output() itemsChanged = new EventEmitter<InventoryItem[]>();

  items: InventoryItem[] = [];
}
