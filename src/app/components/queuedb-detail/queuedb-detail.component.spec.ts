import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuedbDetailComponent } from './queuedb-detail.component';

describe('QueuedbDetailComponent', () => {
  let component: QueuedbDetailComponent;
  let fixture: ComponentFixture<QueuedbDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueuedbDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuedbDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
