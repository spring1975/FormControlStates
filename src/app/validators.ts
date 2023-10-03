import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

// Custom validator function to copy validators from one control to another
export const copyValidators = (sourceControl: AbstractControl): ValidatorFn => {
 
    let validationResult = (control: AbstractControl): ValidationErrors | null => null;
    if (sourceControl.validator !== null) {
        const validator = sourceControl.validator;
        const validators = Validators.compose([validator]);
        // Use the Validators from the source control to validate the target control
        validationResult = validators ?? validationResult;
    }
    // Return the result of validation from the source control
    return validationResult;
  };

