import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCvaComponent } from './select-cva.component';

describe('SelectCvaComponent', () => {
  let component: SelectCvaComponent;
  let fixture: ComponentFixture<SelectCvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCvaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
