import { Component, OnInit } from '@angular/core';
import { NoteElementObject } from './noteitems';
@Component({
  selector: 'app-notesite-item',
  imports: [],
  templateUrl: './notesite-item.component.html',
  styleUrl: './notesite-item.component.scss'
})
export class NotesiteItemComponent implements OnInit{
 noteitems : any =NoteElementObject; 
 selectedindex : number = 0;
 ngOnInit(): void {
   this.selectedindex = 0;
 }
 reload(index: number): void {
  // Az index beállítása a kiválasztott option alapján
  this.selectedindex = index;
}
}
