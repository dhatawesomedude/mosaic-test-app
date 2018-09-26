import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { app } from '../models/app.model';
import { environment } from '../../environments/environment';

const BASE_URL = 'https://api.imgur.com/3';
const HEADERS_CONFIG = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Client-ID ${environment.clientId}`),
  withCredentials: false
};

@Injectable()
export class AppResource {
  constructor(private http: HttpClient) {}

  public getImageList (request: app.ImageApi.GET.Request): Observable<app.ImageApi.GET.Response> {
    return this.http.get<app.ImageApi.GET.Response>
    (`${BASE_URL}/gallery/r/${request.subreddit}/time/week/${request.pageId}`, HEADERS_CONFIG);
  }
  public uploadImage (name, blob): Observable<app.ImageApi.POST.Response> {
    return this.http.post<app.ImageApi.POST.Response>
    (`${BASE_URL}/image`, {image: blob, name},
      HEADERS_CONFIG);
  }
}
