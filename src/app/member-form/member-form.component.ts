import { Component, Injector, forwardRef } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { FormGroupOf } from '../utility-types';

export interface Person {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MemberFormComponent),
      multi: true,
    },
  ]
})
export class MemberFormComponent implements ControlValueAccessor {
  memberForm: FormGroup<FormGroupOf<Person>>;
  readonly parentForm = this.inj.get(ControlContainer).control;

  constructor(
    private readonly inj: Injector,
    private readonly _fb: FormBuilder) {
    this.memberForm = this._init();
  }

  writeValue(member: Person): void {
    this.memberForm.setValue(member);
  }

  onChange = () => {
    //Placeholder
  };
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.memberForm.valueChanges.subscribe(fn);
  }

  onTouched = () => {
    //Placeholder
  };
  registerOnTouched(fn: any): void {
    this.onTouched = () => {
      this.parentForm?.markAsTouched();
      fn.apply(this);
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.memberForm.disable();
    } else {
      this.memberForm.enable();
    }
  }

  private _init(member?: Person) {
    return this._fb.group<FormGroupOf<Person>>({
      firstName: this._fb.nonNullable.control(
        member?.firstName ?? '',
        Validators.required
      ),
      lastName: this._fb.nonNullable.control(
        member?.lastName ?? '',
        Validators.required
      ),
    });
  }
}
