import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this._userService.logout();
    this.router.navigate(['/visualizer/login']);
  }
  isAdmin() {
    return this._userService.isAdmin();
  }

}
