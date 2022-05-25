import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PremiumCalculatorService {

  baseUrl: string = "https://localhost:5001/api";
  url: string;
  data: any;
  constructor(private http: HttpClient) { }

  GetOccupationList() {
    this.url = this.baseUrl + "/PremiumCalculation/GetOccupationList";
    return this.http.get(this.url)
      .pipe(
      catchError(e => throwError(this.handleError(e)))
    );
  }

  CalculatePremium(inputData: any) {
    this.url = this.baseUrl + "/PremiumCalculation/CalculatePremium";
    this.data = {
      'DeathCoverAmount': parseFloat(inputData.deathCoverAmount),
      'RatingID': parseInt(inputData.occupation),
      'Age': parseInt(inputData.age)
    };
    const _headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      //Authorization: 'my-auth-token'
    });
     
    console.log(this.data);

    return this.http.post(this.url,this.data, { headers: _headers })
      .pipe(
        catchError(e => throwError(this.handleError(e)))
      ); 
  }

  public handleError(error) {
    console.log("Error from Angular service: "+ JSON.parse(error));
  }
}
