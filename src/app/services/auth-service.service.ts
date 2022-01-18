import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'


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

  signUp(singupRequest: any, callback: any): void {
    let signupObservable: Observable<SignUpResponse> = this.http.post<SignUpResponse>(this.BASE_URL, singupRequest, {
      params: new HttpParams().set("key", this.API_KEY)
    }).pipe(
      retry(1),
      catchError(this.handleError)
    );

    this.signUpSubscription = this.signUpSubscription = signupObservable.subscribe({
      next: (dataResponse) => {
        console.log(dataResponse);
        this.messageSubject.next({ message: "Signup Successful", status: "success" });
        callback(true);
      },
      error: (errorMsg) => {
        console.log(errorMsg)
        this.messageSubject.next({ message: errorMsg, status: "error" });
        callback(false);
      }
    });
  }



  signIn(singInRequest: any): Observable<any> {
    return this.http.post<SignInResponse>(this.SIGNIN_BASE_URL, singInRequest, {
      params: new HttpParams().set("key", this.API_KEY)
    }).pipe(
      catchError(this.handleError)
    );
  }

  ngOnDestroy(): void {
    this.signUpSubscription.unsubscribe();
  }

  handleError(erroResp: HttpErrorResponse): Observable<any> {
    let errorMsg: string = "An error occured. Please try after sometime!";

    if (!erroResp.error || !erroResp.error.error) {
      return throwError(() => new Error(errorMsg));
    }

    switch (erroResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = "Email Id already exist!"
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = "Email Id not found"
        break;
      case 'INVALID_PASSWORD':
        errorMsg = "Password Invalid. Please try again!"
        break;
      case 'USER_DISABLED':
        errorMsg = "User is disabled. Please signup with a different acoount!"
        break;
    }
    return throwError(() => errorMsg);
  }

}
