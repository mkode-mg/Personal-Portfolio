import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtomTopComponent } from './buttom-top.component';

describe('ButtomTopComponent', () => {
  let component: ButtomTopComponent;
  let fixture: ComponentFixture<ButtomTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtomTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtomTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
