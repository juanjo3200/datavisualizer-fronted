import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../api/user.service';

@Injectable()
export class ProtectLogginGuard implements CanActivate {

    constructor(private _router: Router, private _userService: UserService) {

    }

    canActivate() {
        if (this._userService.getIdentity() != null) {
            this._router.navigate(['/visualizer/home']);
            return false;
        } else {
            return true;
        }
    }


}
