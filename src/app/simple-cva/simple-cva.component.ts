import { Component, Injector, forwardRef } from "@angular/core";
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-simple-cva",
  templateUrl: "./simple-cva.component.html",
  styleUrls: ["./simple-cva.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SimpleCvaComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SimpleCvaComponent),
      multi: true,
    },
  ],
  
})
export class SimpleCvaComponent implements ControlValueAccessor, Validator {
  simpleControl = new FormControl();
  readonly parentForm = this.inj.get(ControlContainer).control;

  constructor(private readonly inj: Injector) {}

  validate(control: FormControl) {
    applyRequiredAsterisk(control, this.simpleControl);
    return this.simpleControl.errors;
  }
  writeValue(val: any): void {
    this.simpleControl.setValue(val);
  }
  onChange = () => {
    //Placeholder
  };
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.simpleControl.valueChanges.subscribe(this.onChange);
  }
  onTouched = () => {
    //Placeholder
  };
  registerOnTouched(fn: any): void {
    this.onTouched = () => {
      this.parentForm?.markAsTouched();
      fn.apply(this);
    };
  }
  /* Interesting comments here:
   * https://github.com/angular/components/blob/9751287c018c63877c7a2f3a7603befa16f2b2bb/src/material/input/input.ts#L168
   */
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.simpleControl.disable();
    } else {
      this.simpleControl.enable();
    }
  }
}

  /**
 * For the material asterisk to display, the internal control needs the Validators.required
 * validator applied directly to it. This function ensures the required validator is
 * added when appropriate.
 *
 * @param source Containing abstract control
 * @param target Internal abstract control
 */
export const applyRequiredAsterisk = (
  source: AbstractControl,
  target: AbstractControl
) => {
  if (
      source.hasValidator(Validators.required) &&
      !target.hasValidator(Validators.required)
  ) {
      target.addValidators(Validators.required);
  }
};


