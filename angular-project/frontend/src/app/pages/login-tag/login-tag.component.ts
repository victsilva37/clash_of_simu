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
          alert('Token verificado correctamente. Registrando jugador...');
  
          // El registro ya lo maneja el backend, solo redirigir al usuario.
          this.isLoading = false;
  
          // Guardar datos en sessionStorage y redirigir
          sessionStorage.setItem('playerData', JSON.stringify(this.playerData));
          // Redirigir al inicio con los datos del jugador
          this.router.navigate(['inicio'], { state: { playerData: this.playerData } });
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