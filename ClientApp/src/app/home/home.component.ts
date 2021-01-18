import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private authorize: AuthorizeService, private router: Router) { }

  ngOnInit(): void {
    this.authorize.isAuthenticated()
      .subscribe((isAuthenticated) => {
        if (isAuthenticated){
          this.router.navigate(['dashboard'])
        }
      } );
  }
}
