import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root', // Proveedor global
})
export class ClashOfClansService {
  private apiUrl = 'http://localhost:3000/players';  // Asegúrate de que la URL base esté correcta
  private apiUrl2 = 'http://localhost:3000/tropas';
  private apiUrl3 = 'http://localhost:3000/hechizos';
  private apiUrl4 = 'http://localhost:3000/heroes';
  private apiUrl5 = 'http://localhost:3000/ejercito';
  private apiUrl6 = 'http://localhost:3000/train_tropa'

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

  registrarHechizos(tag: string): Observable<any> {
    const encodedTag = encodeURIComponent(tag);  // Asegurar codificación del tag
    return this.http.post(`${this.apiUrl3}/${encodedTag}`, {});
  }

  registrarHeroes(tag: string): Observable<any> {
    const encodedTag = encodeURIComponent(tag);  // Asegurar codificación del tag
    return this.http.post(`${this.apiUrl4}/${encodedTag}`, {});
  }
  
  registrarEjercito(fecha: string): Observable<any> {
    const body = { fecha_ejercito: fecha };
    return this.http.post<any>(this.apiUrl5, body);
  }

    // Función para registrar múltiples TrainTropa
  registrarTrainTropas(tropas: { cantidadTropa: number; idEjercito: number; idTropaDisp: number }[]): Observable<any> {
    // Mapeamos las tropas para coincidir con el esquema esperado por el backend
    const body = tropas.map((tropa) => ({
      cant_tropa: tropa.cantidadTropa,
      id_ejercito: tropa.idEjercito,
      id_tropa_disp: tropa.idTropaDisp,
    }));

    // Realizamos una solicitud POST al backend
    return this.http.post<any>(this.apiUrl6, body);
  }


  
  
}