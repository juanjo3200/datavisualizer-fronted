import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VizViewComponent } from './viz-view.component';

describe('VizViewComponent', () => {
  let component: VizViewComponent;
  let fixture: ComponentFixture<VizViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VizViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VizViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
