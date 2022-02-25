import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ImageData} from "../models/image-data";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor(private http: HttpClient) { }

  get(): Observable<ImageData[]> {
    return this.http.get<ImageData[]>(`https://${environment.imagesApiHostname}/Images`);
  }
}
