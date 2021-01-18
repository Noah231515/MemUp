import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  homeLink: string = "/";

  constructor(private authorize: AuthorizeService){}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(){
    this.authorize.isAuthenticated()
      .subscribe(isAuthenticated => {
        if(isAuthenticated){
          this.homeLink = "/dashboard";
        }
      })
  }
}
