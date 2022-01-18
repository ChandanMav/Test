import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';


interface SignUpResponse {
  idToken: string,
  email: string,
  refreshToken: String,
  expiresIn: string,
  localId: string
}

interface SignInResponse extends SignUpResponse {
  registered: boolean
}


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements OnDestroy {

  private BASE_URL: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";
  private SIGNIN_BASE_URL: string = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"
  private API_KEY: string = "AIzaSyDSn-dljYEL-UPHDdj9-yEr5mw-MrJm1mE";

  private signUpSubscription: Subscription;
  messageSubject = new Subject<{ message: string, status: string }>();

  constructor(private http: HttpClient) { }

  signUp(singupRequest: any, callback:any): void {
    let signupObservable: Observable<SignUpResponse> = this.http.post<SignUpResponse>(this.BASE_URL, singupRequest, {
      params: new HttpParams().set("key", this.API_KEY)
    });

    this.signUpSubscription = this.signUpSubscription = signupObservable.subscribe({
      next: (dataResponse) => {
        console.log(dataResponse);
        this.messageSubject.next({ message: "Signup Successful", status: "success" });
        callback(true);
      },
      error: (errorResp) => {
        console.log(errorResp.error.error.message)
        this.messageSubject.next({ message: errorResp.error.error.message, status: "error" });
        callback(false);
      }
    });
  }


  signIn(singInRequest: any): Observable<any> {
    return this.http.post<SignInResponse>(this.SIGNIN_BASE_URL, singInRequest, {
      params: new HttpParams().set("key", this.API_KEY)
    });
  }

  ngOnDestroy(): void {
    this.signUpSubscription.unsubscribe();
  }

}
