import { Component, OnInit } from '@angular/core';
import { NewUser } from '../model/new_user.model';
import { User } from '../model/user.model';
import { AuthServiceService } from '../services/auth-service.service';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: NewUser;
  isLoggedIn: boolean = false;

  // constructor(private authServ: AuthServiceService) { }

  constructor(private commonServiceService: CommonServiceService) { }

  ngOnInit(): void {
    // this.authServ.user.subscribe(user => {
    //   this.user = user;
    // });    
    this.commonServiceService.loggedInUser.subscribe(data => this.isLoggedIn = data);
  }

}
