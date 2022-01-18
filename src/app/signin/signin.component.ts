import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  message: string = "";
  isError: boolean;

  constructor(private fb: FormBuilder, 
    private authServ: AuthServiceService,
    private cmnsrvc:CommonServiceService,
    private router:Router) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ["", Validators.required, Validators.email],
      password: ["", Validators.required]
    });
  }

  signIn(): void {
    this.authServ.signIn({
      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
      returnSecureToken: true
    }).subscribe({
      next: (data) => { 
        console.log(data);
        this.isError = false;
        this.message = "Successfully Logged In!";
        this.cmnsrvc.isLoggedIn.next(true);
       
        setTimeout(()=> {
          this.router.navigate([""]);
        }, 2000);        
        
      },
      error: (e) => { 
        this.isError = true;
        console.log(e)
        this.message = e.error.error.message;
      }

    })
  }

  getErrorClass(): string {
    return this.isError ? 'alert-danger' : 'alert-primary';
  }


}
