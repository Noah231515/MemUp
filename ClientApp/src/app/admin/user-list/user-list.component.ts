import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from 'src/app/models/user-dto';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: UserDto[];
  public displayedColumns: string[] = ['userName', 'roles'];
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data.users;
    });
  }

}
