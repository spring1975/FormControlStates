import { Component, Injector, forwardRef } from "@angular/core";
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Person } from "../member-form/member-form.component";

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MembersComponent),
      multi: true,
    },
  ],
})
export class MembersComponent implements ControlValueAccessor {
  readonly members = this._init();
  readonly parentForm = this.inj.get(ControlContainer).control;

  constructor(
    private readonly inj: Injector,
    private readonly _fb: FormBuilder
  ) {}

  writeValue(members: (Person | null)[]): void {
    this.members.clear();

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
    this.members.valueChanges.subscribe(fn);
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

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.members.disable();
    } else {
      this.members.enable();
    }
  }

  addMember(member?: Person) {
    const m = this._fb.control<Person>(
      member ?? { firstName: "", lastName: "" }
    );
    this.members.push(m);
  }
  removeMember(i: number) {
    this.members.removeAt(i);
  }
  private _init() {
    return this._fb.array<Person[]>([])
  }

  trackByFn(index: number, _: AbstractControl) {
    return index;
  }
}
