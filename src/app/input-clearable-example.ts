import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Person } from './member-form/member-form.component';
import { GUID, guidValidator } from './guid';

/**
 * @title Input with a clear button
 */
@Component({
  selector: 'input-clearable-example',
  templateUrl: './input-clearable-example.html',
  styleUrls: ['./input-clearable-example.scss'],
})
export class InputClearableExample {
  exampleForm = this._fb.group({
    clearableInput: this._fb.control('start'),
    otherInput: this._fb.control('', [Validators.required]),
    mustHaveValue: this._fb.nonNullable.control('something'),
    members: this._fb.control<Person[]>([]),
    favoriteColor: this._fb.control('', [Validators.required]),
    band: this._fb.control<GUID | null>(null, [guidValidator]),
  });

  constructor(private readonly _fb: FormBuilder) {}

  setForm() {
    this.exampleForm.setValue({
      clearableInput: 'foo',
      otherInput: 'bar',
      mustHaveValue: 'baz',
      favoriteColor: 'green',
      band: new GUID('e264dfe6-be00-40f5-a7c9-65c9974d6ee9'),
      members: [
        {
          firstName: 'Syd',
          lastName: 'Barrett',
        },
        {
          firstName: 'Roger',
          lastName: 'Waters',
        },
        {
          firstName: 'Nick',
          lastName: 'Mason',
        },
        {
          firstName: 'David',
          lastName: 'Gilmour',
        },
      ],
    });
  }
}
