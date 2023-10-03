import { AbstractControl, ValidatorFn } from '@angular/forms';

export class GUID {
    private str: string;

    constructor(str?: string) {
        this.str = str || GUID.getNewGUIDString();
    }

    toString() {
        return this.str;
    }

    private static getNewGUIDString() {
        // your favorite guid generation function could go here
        // ex: http://stackoverflow.com/a/8809472/188246
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}


export const guidValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (!value) {
      // If the value is empty, consider it valid (you can change this behavior)
      return null;
    }

    // Regular expression to match a valid GUID pattern
    const guidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (!guidPattern.test(value)) {
      // If the value does not match the GUID pattern, return an error
      return { invalidGuid: true };
    }

    // Value is a valid GUID
    return null;
  };
}
