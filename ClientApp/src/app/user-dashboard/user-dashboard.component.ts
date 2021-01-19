import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  isAuthenticated: boolean;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isAuthenticated = this.route.snapshot.data['isAuthenticated'];
  }
}
