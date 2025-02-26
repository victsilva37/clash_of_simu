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
  isLoading: boolean = false;

  constructor(
    private clashOfClansService: ClashOfClansService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit(): void {
    if (!this.playerTag) return;
  
    this.isLoading = true;
    this.playerData = null;
  
    this.clashOfClansService.getPlayer(this.playerTag).subscribe({
      next: (data) => {
        this.playerData = data;
        this.isLoading = false;
        // Redirigir al inicio con los datos del jugador
        this.router.navigate(['inicio'], { state: { playerData: this.playerData } });
      },
      error: (err) => {
        console.error('Error al obtener los datos del jugador:', err);
        this.isLoading = false;
      },
    });
  }
}
