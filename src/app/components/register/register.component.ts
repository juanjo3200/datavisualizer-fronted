import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmailValidator, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user: User;
  public confirmPassword: String;
  public status: String;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.user = new User( '', '', '', 'ROLE_USER');
    this.confirmPassword = '';
  }
  onSubmit(registerForm){
    this._userService.register(this.user).subscribe(
      response => {
        if(response.user){
          this.status = 'success';
          registerForm.reset();
          this.user = new User( '', '', '', 'ROLE_USER');
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(<any> error);
      }
    );
  }

}
