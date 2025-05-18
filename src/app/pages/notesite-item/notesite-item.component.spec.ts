import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesiteItemComponent } from './notesite-item.component';

describe('NotesiteItemComponent', () => {
  let component: NotesiteItemComponent;
  let fixture: ComponentFixture<NotesiteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesiteItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesiteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
