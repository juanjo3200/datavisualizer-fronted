import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizqueueListComponent } from './vizqueue-list.component';

describe('VizqueueListComponent', () => {
  let component: VizqueueListComponent;
  let fixture: ComponentFixture<VizqueueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizqueueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizqueueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
