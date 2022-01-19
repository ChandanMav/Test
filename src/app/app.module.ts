import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpInterceptorInterceptor } from './interceptors/http-interceptor.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { CommonServiceService } from './services/common-service.service';
import { AuthServiceService } from './services/auth-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    ShortenPipe,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
