import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowalTableComponent } from './borrowal-table.component';

describe('BorrowalTableComponent', () => {
  let component: BorrowalTableComponent;
  let fixture: ComponentFixture<BorrowalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowalTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
