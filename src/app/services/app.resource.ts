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

  public getImageList (request: app.imageApi.get.Request): Observable<app.imageApi.get.Response> {
    return this.http.get<app.imageApi.get.Response>
    (`${BASE_URL}/gallery/r/${request.subreddit}/time/week/${request.pageId}`, HEADERS_CONFIG);
  }
  public uploadImage (name: string, blob: string): Observable<app.imageApi.post.Response> {
    return this.http.post<app.imageApi.post.Response>
    (`${BASE_URL}/image`, {image: blob, name},
      HEADERS_CONFIG);
  }
}
