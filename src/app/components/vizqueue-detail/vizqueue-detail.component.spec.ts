import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizqueueDetailComponent } from './vizqueue-detail.component';

describe('VizqueueDetailComponent', () => {
  let component: VizqueueDetailComponent;
  let fixture: ComponentFixture<VizqueueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizqueueDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizqueueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
