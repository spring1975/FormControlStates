import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-simple-cva',
  templateUrl: './simple-cva.component.html',
  styleUrls: ['./simple-cva.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SimpleCvaComponent),
    },
  ],
})
export class SimpleCvaComponent implements ControlValueAccessor {
  control = new FormControl();

  constructor() {}

  writeValue(val: any): void {
    this.control.setValue(val);
  }
  onChange = () => {
    //Placeholder
  };
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  onTouched = () => {
    //Placeholder
  };
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
