import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoModalsComponent } from './demo-modals.component';

describe('DemoModalsComponent', () => {
  let component: DemoModalsComponent;
  let fixture: ComponentFixture<DemoModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoModalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
