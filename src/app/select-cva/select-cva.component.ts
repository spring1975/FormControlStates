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
import { GUID } from "../guid";

@Component({
  selector: "app-select-cva",
  templateUrl: "./select-cva.component.html",
  styleUrls: ["./select-cva.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCvaComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectCvaComponent),
      multi: true,
    },
  ],
})
export class SelectCvaComponent implements ControlValueAccessor, Validator {
  selectControl = new FormControl<string>(
    "00000000-0000-0000-0000-000000000000",
    { nonNullable: true }
  );
  readonly bands = [
    {
      id: new GUID("a3130c86-7fc3-47a8-ab62-161290db089d").toString() ,
      name: "The Beatles",
    },
    {
      id: new GUID("215686dc-cf8a-4307-ac12-fb5a764ed494").toString() ,
      name: "The Rolling Stones",
    },
    {
      id: new GUID("a02d763e-7ea4-42c0-8ba8-5953828db04b").toString() ,
      name: "The Who",
    },
    {
      id: new GUID("e264dfe6-be00-40f5-a7c9-65c9974d6ee9").toString() ,
      name: "Pink Floyd",
    },
  ];
  readonly parentForm = this.inj.get(ControlContainer).control;

  constructor(private readonly inj: Injector) {}

  validate(control: FormControl) {
    if (this.selectControl.validator === null) {
      const validator = control.validator;
      const validators = Validators.compose([validator]);
      if (validators) {
        this.selectControl.addValidators(validators);
      }
    } else {
      this.selectControl.valid;
    }
    return this.selectControl.errors;
  }
  writeValue(val: string): void {
    this.selectControl.setValue(val);
  }
  onChange = () => {
    //Placeholder
  };
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.selectControl.valueChanges.subscribe(this.onChange);
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
      this.selectControl.disable();
    } else {
      this.selectControl.enable();
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
