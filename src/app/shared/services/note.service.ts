import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, orderBy, getDoc, where } from '@angular/fire/firestore';
import { Observable, from, switchMap, map, of, take, firstValueFrom, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Note } from '../../interfaces/Note';
import { User } from '../../interfaces/User';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [];
  private notesSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

  constructor() {}

  getAllNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  addNote(note: Omit<Note, 'id'>): void {
    const newId = this.notes.length > 0
      ? Math.max(...this.notes.map(n => n.id)) + 1
      : 1;

    const newNote: Note = {
      ...note,
      id: newId
    };

    this.notes.push(newNote);
    this.notesSubject.next([...this.notes]);
  }

  deleteNote(noteId: number | string): void {
    this.notes = this.notes.filter(note => note.id !== +noteId);
    this.notesSubject.next([...this.notes]);
  }
}