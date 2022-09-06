import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GeneralServicesService {
  constructor(private http: HttpClient) {}

  getTasks(url: string) {
    return this.http.get(url);
  }
}
