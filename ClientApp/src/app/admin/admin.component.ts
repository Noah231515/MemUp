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

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
