import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCvaComponent } from './simple-cva.component';

describe('SimpleCvaComponent', () => {
  let component: SimpleCvaComponent;
  let fixture: ComponentFixture<SimpleCvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleCvaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleCvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
