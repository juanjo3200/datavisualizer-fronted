import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../api/user.service';

@Injectable()
export class LogginGuard implements CanActivate {

    constructor(private _router: Router, private _userService: UserService) {

    }

    canActivate() {
       if (this._userService.getIdentity() != null) {
            return true;
        }else {
            this._router.navigate(['/login']);
            return false;
        }
    }


}
