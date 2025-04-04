import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root', // Proveedor global
})
export class ClashOfClansService {
  private apiUrl = 'http://localhost:3000/players';  // Asegúrate de que la URL base esté correcta
  private apiUrl2 = 'http://localhost:3000/tropas'

  constructor(private http: HttpClient) {}

  getPlayer(tag: string): Observable<any> {
    const encodedTag = encodeURIComponent(tag);  // Asegúrate de codificar el tag si tiene caracteres especiales
    return this.http.get(`${this.apiUrl}/${encodedTag}`);
  }

  verifyToken(tag: string, token: string): Observable<any> {
    const encodedTag = encodeURIComponent(tag);  // Codificar el tag aquí también
    return this.http.post(`${this.apiUrl}/${encodedTag}/verifytoken`, { token });
  }

  registrarTropas(tag: string): Observable<any> {
    const encodedTag = encodeURIComponent(tag);  // Asegurar codificación del tag
    return this.http.post(`${this.apiUrl2}/${encodedTag}`, {});
  }
  
}