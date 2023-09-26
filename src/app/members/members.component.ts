import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Person } from '../member-form/member-form.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MembersComponent),
      multi: true,
    },
  ],
})
export class MembersComponent implements ControlValueAccessor {
  readonly membersArray = this._init();

  constructor(private readonly _fb: FormBuilder) {}

  writeValue(members: (Person | null)[]): void {
    this.membersArray.clear();

    for (let m of members) {
      if (m) {
        this.addMember(m);
      }
    }
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
      this.membersArray.disable();
    } else {
      this.membersArray.enable();
    }
  }

  addMember(member?: Person) {
    const m = this._fb.control<Person>(member ?? {firstName:'', lastName: ''});
    this.membersArray.push(m);
  }
  removeMember(i: number) {
    this.membersArray.removeAt(i);
  }
  private _init() {
    return this._fb.array<Person>([]);
  }

  trackByFn(index: number, _: AbstractControl) {
    return index;
  }
}
