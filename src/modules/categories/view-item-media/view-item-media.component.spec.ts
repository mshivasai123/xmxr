import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemMediaComponent } from './view-item-media.component';

describe('ViewItemMediaComponent', () => {
  let component: ViewItemMediaComponent;
  let fixture: ComponentFixture<ViewItemMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewItemMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItemMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
