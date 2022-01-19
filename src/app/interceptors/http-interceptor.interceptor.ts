import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';

import { Observable, of } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Inside Http Interceptors") 

    let existingParams:HttpParams = request.params
    existingParams = existingParams.set("auth", "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwMTU0NmJkMWRhMzA0ZDc2NGNmZWUzYTJhZTVjZDBlNGY2ZjgyN2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvZHVjdGRlbW8tMWFhOTkiLCJhdWQiOiJwcm9kdWN0ZGVtby0xYWE5OSIsImF1dGhfdGltZSI6MTY0MjU4MjAwNywidXNlcl9pZCI6ImE4QXZNbEVMS29ieUxxNDFXWElOcmcwbTNwcTEiLCJzdWIiOiJhOEF2TWxFTEtvYnlMcTQxV1hJTnJnMG0zcHExIiwiaWF0IjoxNjQyNTgyMDA3LCJleHAiOjE2NDI1ODU2MDcsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFkbWluQGFkbWluLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.0ldSDRfMyeQLRDzX-i_n0om80IgUP9Wq5UlDkch2Odq03SW-3ecRWnBRLx4LnRvt4fe1WD_6pMAvLwMHe0XFxs83-Pf7pt9U_fU0B9i99XbQ5f75KnjoE3sSEQOhHUYpJRbW4pv7XncrHLXo9QXZu4P7SXT-tNaIOJuFwDJhxkd2GdBGuoL0itNFtn0K1qUBJGFL91dFmFmI-6aVdN66LA7ZJf-KEtXiWhy_8x7plLb17j7mQPa7a6GFxPndKd1orxvQBy2Hq2uH9rloNxcXTDLwM5Rsqeo_2fnPEuJ-yBXe4lofxmpfjBZ8levDF9ZvQZmICyfov_3LNxSGKvFAMQ");

    const modifiedRequest = request.clone({
      params : existingParams    
    });
    
    return next.handle(modifiedRequest);
    //return next.handle(request);

  }
}
