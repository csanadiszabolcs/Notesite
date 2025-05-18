import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesiteComponent } from './notesite.component';

describe('NotesiteComponent', () => {
  let component: NotesiteComponent;
  let fixture: ComponentFixture<NotesiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
