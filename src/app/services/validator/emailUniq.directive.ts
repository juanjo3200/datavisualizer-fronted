import { Directive, forwardRef, Attribute } from '@angular/core';
import { AbstractControl, Validator, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { UserService } from '../user/user.service';

@Directive({
    selector: '[asyncEmailValidator]',
    providers: [
        { provide: NG_ASYNC_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }
    ]
})
export class EmailValidatorDirective implements Validator {
    constructor(private _userService: UserService, @Attribute('actualEmail') public actualEmail: boolean) {
    }

    validate(c: AbstractControl) {
        return new Promise(resolve =>
            this._userService.checkEmail(c.value).subscribe(response => {
                if (response) {
                    if (this.actualEmail && JSON.parse(this._userService.getIdentity()).email === c.value ) {
                        resolve(null);
                    }else{
                        resolve({ asyncInvalid: true });
                    }

                }
            }, error => {
                resolve(null);
            }));
    }
}