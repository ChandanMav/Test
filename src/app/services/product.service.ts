import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../model/product';

// {"-Mtaelb-Xakx19JjOkIz":{"description":"Test","name":"samsung","price":12};

// {key:string: {
//   description:string,
//   name:string,
//   price:string
// }}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL: string = "https://productdemo-1aa99-default-rtdb.firebaseio.com/products.json";

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {

    return this.http.get(this.URL)
      .pipe(
        map(this.handleProduct),
        catchError(this.handleError)
      );

  }

  handleProduct(data: any): any {
    let products: Product[] = [];
    for (let key in data) {
      products.push({ id: key, ...data[key] })
    }
    return products;
  }

  handleError(error: HttpErrorResponse): any {
    let errorMsg: string = "An error occured. Please try after sometime!";
    return throwError(() => errorMsg);
  }
}
