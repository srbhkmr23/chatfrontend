import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

import { UrlsService } from '../service/urls.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient, public urlsService: UrlsService) {
  }


  // using httpclient
  callApi(dataObject): Observable<any> {
    let urlObject = this.urlsService.urlObject[dataObject.action];
    let method = urlObject.method;
    let url = urlObject.url//+'a';
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' });

    let options = {
      body: dataObject.requestBodyData || {},
      headers: headers
    }

    return this.http.request(method, url, options)
      .pipe(
        tap(
          result => {
            return result;
          },
          error => {
            console.log('fetched error', error)
            return error
          })
      );
  }

  // using http
  makeApiCall(dataObject) {
    let urlObject = this.urlsService.urlObject[dataObject.action];
    let method = urlObject.method;
    let url = urlObject.url;

    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers });

    return this.http.request(method, url)
      .pipe(map((response: any) => response))
  }
}
