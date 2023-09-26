import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from './member-form/member-form.component';

/**
 * @title Input with a clear button
 */
@Component({
  selector: 'input-clearable-example',
  templateUrl: './input-clearable-example.html',
  styleUrls: ['./input-clearable-example.css'],
})
export class InputClearableExample {
  exampleForm = new FormGroup({
    clearableInput: new FormControl('start'),
    otherInput: new FormControl('', [Validators.required]),
    mustHaveValue: new FormControl('something', { nonNullable: true }),
    members: new FormControl<Person[]>([]),
  });

  setForm() {
    this.exampleForm.setValue({
      clearableInput: 'foo',
      otherInput: 'bar',
      mustHaveValue: 'baz',
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
