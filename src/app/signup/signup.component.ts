import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  message: string = "";
  isError: boolean;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthServiceService, 
    private router:Router   
    ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.authService.messageSubject.subscribe(msgObj => {
      this.message = msgObj.message;
      if (msgObj.status === 'success') {
        this.isError = false;       
        this.message = this.message + " Redirecting to you Sign in Page"
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 3000)
      } else {
        this.isError = true;
      }
    });

  }

  signUp() {
    console.log(this.signupForm);

    let singupRequest: any = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      returnSecureToken: true
    }

    this.authService.signUp(singupRequest);
  }

  getErrorClass(): string {
    return this.isError ? 'alert-danger' : 'alert-primary';
  }

}
