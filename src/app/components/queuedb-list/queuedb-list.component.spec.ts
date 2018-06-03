import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuedbListComponent } from './queuedb-list.component';

describe('QueuedbListComponent', () => {
  let component: QueuedbListComponent;
  let fixture: ComponentFixture<QueuedbListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueuedbListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuedbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
