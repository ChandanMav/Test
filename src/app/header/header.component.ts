import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn:boolean = false;
  constructor(private cmsrvc: CommonServiceService) { }

  ngOnInit(): void {
    this.cmsrvc.isLoggedIn.subscribe(isLoggedIn => this.loggedIn = isLoggedIn )
  }

}
