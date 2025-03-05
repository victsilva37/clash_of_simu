import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpellsSpaceData } from '../../../src/app/interfaces/spells_spaces';

@Injectable({
  providedIn: 'root'
})
export class SpellsSpacesService {

   private jsonUrl = 'extras/spell-info/spells_spaces.json'; // Ruta del JSON
  
    constructor(private http: HttpClient) {}
  
    // Método para obtener los datos del JSON
    getTroopsSpaceData(): Observable<SpellsSpaceData> {
      return this.http.get<SpellsSpaceData>(this.jsonUrl);
    }
}
