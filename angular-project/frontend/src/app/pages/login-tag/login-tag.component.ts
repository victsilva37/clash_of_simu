import { Component, OnInit } from '@angular/core';
import { ClashOfClansService } from '../../services/clash-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-tag',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-tag.component.html',
  styleUrls: ['./login-tag.component.css']
})
export class LoginTagComponent implements OnInit {
  playerTag: string = '';
  playerData: any;
  apiToken: string = ''; // Para capturar el token
  isLoading: boolean = false;

  constructor(
    private clashOfClansService: ClashOfClansService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.playerTag) return;

    this.isLoading = true;
    this.playerData = null;
  
    sessionStorage.setItem('playerTag', this.playerTag);
  
    this.clashOfClansService.getPlayer(this.playerTag).subscribe({
      next: (data) => {
        this.playerData = data;
        this.isLoading = false;
        this.verifyToken(); // Llamar a verificar el token después de obtener los datos
      },
      error: (err) => {
        console.error('Error al obtener los datos del jugador:', err);
        this.isLoading = false;
      },
    });
  }

  
  verifyToken(): void {
    console.log('Token ingresado:', this.apiToken); // Verificar que se captura bien el token
    
    if (!this.apiToken) {
      console.error('Error: apiToken está vacío.');
      return;
    }
  
    this.isLoading = true;
  
    this.clashOfClansService.verifyToken(this.playerTag, this.apiToken).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response); // Verificar qué responde el backend
  
        if (response.status && response.status.toLowerCase() === 'success'){
          // Ahora registramos las tropas del jugador en el backend
          this.clashOfClansService.registrarTropas(this.playerTag).subscribe({
            next: (tropaResponse) => {
              console.log('Tropas registradas correctamente:', tropaResponse);
            },

            error: (error) => {
              console.error('Error al registrar las tropas:', error);
              alert('Hubo un error al registrar las tropas.');
              this.isLoading = false;
            }
          });

          // Ahora registramos las tropas del jugador en el backend
          this.clashOfClansService.registrarHechizos(this.playerTag).subscribe({
            next: (hechizoResponse) => {
              console.log('Hechizos registradas correctamente:', hechizoResponse);
            },
            error: (error) => {
              console.error('Error al registrar los hechizos:', error);
              alert('Hubo un error al registrar los hechizos.');
              this.isLoading = false;
            }
          });

          // Ahora registramos las tropas del jugador en el backend
          this.clashOfClansService.registrarHeroes(this.playerTag).subscribe({
            next: (heroeResponse) => {
              console.log('Heroes registradas correctamente:', heroeResponse);
            },
            error: (error) => {
              console.error('Error al registrar los heroes:', error);
              alert('Hubo un error al registrar los heroes.');
              this.isLoading = false;
            }
          });

          // Guardar los datos en sessionStorage y redirigir
          sessionStorage.setItem('playerData', JSON.stringify(this.playerData));
          this.router.navigate(['inicio'], { state: { playerData: this.playerData } });

          alert("Tropas, hechizos y heroes registrados correctamente")
          
        } else {
          alert('El token ingresado no es válido.');
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error al verificar el token:', err);
        alert('Error al verificar el token.');
        this.isLoading = false;
      },
    });
  }
  
}