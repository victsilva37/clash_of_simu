import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TroopSpaceData } from '../../../src/app/interfaces/troops-spaces';// Asegúrate de importar la interfaz

@Injectable({
  providedIn: 'root',
})
export class TroopSpaceService {
  private jsonUrl = 'extras/troop-info/troops_spaces.json'; // Ruta del JSON

  constructor(private http: HttpClient) {}

  // Método para obtener los datos del JSON
  getTroopsSpaceData(): Observable<TroopSpaceData> {
    return this.http.get<TroopSpaceData>(this.jsonUrl);
  }
}

