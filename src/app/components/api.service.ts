import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Survey } from  './survey';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "http://127.0.0.1:8080";

  readSurveys(): Observable<Surveys[]>{
   return this.httpClient.get<Surveys[]>(`${this.PHP_API_SERVER}/api/read.php`);
 }

  constructor(private httpClient: HttpClient) {}
}
