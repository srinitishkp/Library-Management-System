import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianHeaderComponent } from './librarian-header.component';

describe('LibrarianHeaderComponent', () => {
  let component: LibrarianHeaderComponent;
  let fixture: ComponentFixture<LibrarianHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrarianHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrarianHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
