import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
  exampleForm = new FormGroup({
    clearableInput: new FormControl('start'),
    otherInput: new FormControl('', [Validators.required]),
    mustHaveValue: new FormControl('something', { nonNullable: true }),
    members: new FormControl<Person[]>([]),
    favoriteColor: new FormControl('', [Validators.required]),
    band: new FormControl<GUID | null>(null, [guidValidator]),
  });

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
