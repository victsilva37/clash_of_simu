import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root', // Proveedor global
})
export class ClashOfClansService {
  private readonly apiUrl = '/api/v1/players/';


  private readonly headers = new HttpHeaders({
    Accept: 'application/json',
    Authorization:
      'Bearer '+environment.apiKey,
  });

  constructor(private http: HttpClient) {}

  getPlayer(playerTag: string): Observable<any> {
    const encodedTag = encodeURIComponent(playerTag);
    // Construye la URL completa
    const url = `${this.apiUrl}${encodedTag}`;
    return this.http.get(url, { headers: this.headers });
  }
}
