import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  message: string = "";
  isError: boolean;
  isLoading: boolean = false;;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });

    this.authService.messageSubject.subscribe(msgObj => {
      this.message = msgObj.message;
      if (msgObj.status === 'success') {
        this.isError = false;
        this.message = this.message;       
      } else {
        this.isError = true;
      }
    });

  }

  signUp() {
    console.log(this.signupForm);
    this.message = "";

    if (!this.signupForm.valid) {
      return;
    }

    this.isLoading = true;
    let singupRequest: any = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      returnSecureToken: true
    }

    this.authService.signUp(singupRequest, (status: boolean) => {
      this.isLoading = false;
      if (status) {
        Swal.fire({
          title: 'Signup Successful!',
          text: "Do you want to Sign In?",
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/signin']);
          }
        })
      }
    });

    this.signupForm.reset();
  }

  getErrorClass(): string {
    return this.isError ? 'alert-danger' : 'alert-primary';
  }

  clear() {
    this.signupForm.reset();
  }

}
