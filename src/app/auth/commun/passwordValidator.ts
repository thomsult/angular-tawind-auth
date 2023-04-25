import {AbstractControl, ValidatorFn} from '@angular/forms';
/**
 * This is a TypeScript function that returns a validator function to check if two password fields
 * match.
 * @param {string} firstPassword - The first item is a string representing the name of the first password input
 * field in a form.
 * @param {string} secondPassword - The second item is likely another input field that is meant to confirm the
 * password entered in the first item. This function is a validator function that checks if the values
 * of both items match and returns an error if they do not match.
 * @returns A validator function that checks if two form control values match and returns an error if
 * they don't match. The function takes two arguments, `firstPassword` and `secondPassword`, which are the names of the
 * form controls to compare.
 */
export function passwordValidator(firstPassword:string,secondPassword:string): ValidatorFn {
    return (control: AbstractControl): {
      [key: string]: { value: string };
    } | null => {
      if (!control.value?.[firstPassword] || !control.value?.[secondPassword])
        return { empty: { value: control.value } };
      const forbidden =
        control.value?.[firstPassword] !== control.value?.[secondPassword];
      return forbidden ? { 'password no match': { value: control.value } } : null;
    };
  }