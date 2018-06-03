import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component',
  templateUrl: './imagegrid.component.html',
  styleUrls: ['./imagegrid.component.css'],
})
export class ImageGridComponent implements OnInit {

  public loaded: boolean;
  public vizs;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserViz().subscribe(response => {
      this.vizs = response.viz.filter(viz => viz.url);
      this.loaded = true;
    });

  }

  thumbnail(img: string){
    img = img ? img : 'http://www.confidentonline.com/uploads/227057695no%20image.jpg';
    return img;
  }
  ver(viz) {
    this.router.navigate(['home/vizView/' + viz._id]);
  }

}
