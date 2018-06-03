import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueDbComponent } from './queue-db.component';

describe('QueueDbComponent', () => {
  let component: QueueDbComponent;
  let fixture: ComponentFixture<QueueDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
