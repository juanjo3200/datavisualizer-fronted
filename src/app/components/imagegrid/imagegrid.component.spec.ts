import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGridComponent } from './imagegrid.component';

describe('ComponentComponent', () => {
  let component: ImageGridComponent;
  let fixture: ComponentFixture<ImageGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
