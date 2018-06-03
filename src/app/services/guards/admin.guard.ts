import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../api/user.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private _router: Router, private _userService: UserService) {

    }

    canActivate() {
        if (this._userService.isAdmin()) {
            return true;
        } else {
            return false;
        }
    }


}
