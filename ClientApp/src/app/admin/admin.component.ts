import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from '../models/user-dto';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users: UserDto[];
  public displayedColumns: string[] = ["userName", "roles"]
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data.users;
    });
  }

}
