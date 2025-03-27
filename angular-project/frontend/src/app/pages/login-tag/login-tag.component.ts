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
    if (!this.apiToken) {
      // alert('Por favor ingresa un token válido.');
      return;
    }

    this.isLoading = true;

    // Aquí se realiza la llamada a tu backend NestJS
    this.clashOfClansService.verifyToken(this.playerTag, this.apiToken).subscribe({
      next: (response) => {
        console.log('Token verificado:', response);
      
        if (response.status === 'ok') {
          alert('Token verificado correctamente.');
          this.isLoading = false;
  
          // Redirigir al inicio con los datos del jugador
          this.router.navigate(['inicio'], { state: { playerData: this.playerData } });
        } else {
          alert('El token ingresado no es válido. Por favor verifica e intenta nuevamente.');
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
