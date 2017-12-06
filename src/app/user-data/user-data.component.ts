import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { EmailValidator, Validators } from '@angular/forms';
import { User } from '../components/models/user';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  public user: User;
  public confirmPassword: string;
  public status : string;
  constructor(private _userService: UserService) { 
  }

  ngOnInit() {
    let identity = JSON.parse(this._userService.getIdentity());
    this.user = new User(identity.name, identity.email, identity.password, identity.role);
    this.user.password = '';
    this.confirmPassword = '';
  }

  onSubmit(userdataForm){
    this._userService.update(this.user).subscribe(
      response => {
        if(response.token){
          console.log(this.user);
          this._userService.setIdentity(this.user);
          this._userService.setToken(response.token);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
    this.user.password = '';
    this.confirmPassword = '';
    userdataForm.reset({name : this.user.name, email: this.user.email, password: this.user.password,
      confirmPass: this.confirmPassword});
  }
}
