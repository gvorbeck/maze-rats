import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-weapon-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './weapon-input.component.html',
  styleUrls: ['./weapon-input.component.scss'],
})
export class WeaponInputComponent {
  @Input() weapon = { name: '', type: 'light-weapon', location: 'hands' };
  @Input() weaponDropdownOptions: string[] = [];
  @Input() locationDropdownOptions: string[] = [];
  @Input() numWeapons: number = 0;
  @Output()
  weaponAdded = new EventEmitter<{
    name: string;
    type: string;
    location: string;
  }>();

  addWeapon() {
    console.log('numWeapons', this.numWeapons);
    this.weaponAdded.emit(this.weapon);
    this.weapon = { name: '', type: 'light-weapon', location: 'hands' };
  }
}
