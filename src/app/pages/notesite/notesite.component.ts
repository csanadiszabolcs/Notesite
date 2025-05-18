import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { DateFormPipe } from '../../Pipes/date.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Note } from '../../interfaces/Note';
import { TruncatePipe } from '../../Pipes/truncate.pipe';
import { NoteService } from '../../shared/services/note.service';

@Component({
  selector: 'app-notesite',
  imports: [FormsModule,ReactiveFormsModule !,CommonModule,DateFormPipe,TruncatePipe,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatTableModule,MatIconModule,MatSelectModule,MatSliderModule,MatButtonToggleModule],
  templateUrl: './notesite.component.html',
  styleUrl: './notesite.component.scss',
  standalone:true
})



export class NotesiteComponent implements OnInit {
@Input() catogory:string  ='Jegyzeteim';
@Output() noteAdding = new EventEmitter<Note>();

newNote:string = '';
newNoteTitle: string = '';
newNoteContent: string = '';
newNotePriority: 'Sürgős' | 'Nem sürgős' = "Sürgős";
selectedIndex:number = 0;
fontSize: number = 16;
isLoading:boolean = false;
selectedTheme: 'light' | 'dark' | 'colorful' = 'light';
noteForm!: FormGroup;
 notes: Note[] = [
  {
    id: 1,
    title: 'Bevásárlólista',
    content: 'Tej, kenyér, sajt, tojás, kávé',
    priority: 'Nem sürgős',
    dueDate: '2025'
  },
  {
    id: 2,
    title: 'Edzésterv péntekre',
    content: '10 perc bemelegítés, 3x10 fekvőtámasz, 20 perc futás 10 perc bemelegítés, 3x10 fekvőtámasz, 20 perc futás 10 perc bemelegítés, 3x10 fekvőtámasz, 20 perc futás',
    priority: 'Sürgős',
    dueDate: '2025'
  },
  {
    id: 3,
    title: 'Új laptop keresése',
    content: '16GB RAM, SSD minimum 512GB, jó kijelző',
    priority: 'Nem sürgős',
    dueDate: '2025'
  },
  {
    id: 4,
    title: 'Feladatmegoldás beadandóhoz',
    content: 'Programozás házi – fájlkezelés rész kidolgozása',
    priority: 'Nem sürgős',
    dueDate: '2025'
  },];


  subscriptions: any;
  constructor(
    private fb: FormBuilder,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    //this.loadNotes();
  }

  initializeForm(): void {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(5)]],
      priority: ['Sürgős', Validators.required]
    });
  }

  loadNotes(): void {
    this.noteService.getAllNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  addNote(): void {
    if (this.noteForm.valid) {
      this.isLoading = true;
      const formValue = this.noteForm.value;

      const newNote :Omit<Note, 'id'> = {
        title: formValue.title.trim(),
        content: formValue.content.trim(),
        priority: formValue.priority,
        dueDate: new Date().toISOString()
      };
  console.log('addNote called', newNote);
      this.noteService.addNote(newNote);
      this.noteForm.reset({ priority: 'Sürgős' });
      this.loadNotes();
      this.isLoading = false;
    } else {
      Object.values(this.noteForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  deleteNote(id: string): void {
    const confirmed = confirm('Biztosan törlöd ezt a jegyzetet?');
    if (confirmed) {
      this.noteService.deleteNote(id);
      this.loadNotes();
    }
  }

  getPriorityClass(priority: string): string {
    return priority === 'Sürgős' ? 'urgent' : 'not-urgent';
  }
}
