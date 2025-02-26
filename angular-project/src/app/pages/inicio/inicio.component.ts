import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  playerData: any; // Aquí defines playerData
  currentPage: number = 0; // Página actual (inicia en 0)
  itemsPerPage: number = 6; // Número de tropas por página

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Recuperar datos del estado de navegación
    const navigation = history.state;
    if (navigation && navigation.playerData) {
      this.playerData = navigation.playerData; // Asigna los datos a playerData
    }
  }

  // Obtener las tropas a mostrar en la página actual
  get troopsToShow() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.playerData.troops.slice(startIndex, endIndex); // Slice para mostrar solo las tropas correspondientes
  }

  // Función para mover el carrusel a la siguiente página
  moveCarousel(direction: string): void {
    const totalPages = Math.ceil(this.playerData.troops.length / this.itemsPerPage);

    if (direction === 'next') {
      this.currentPage = (this.currentPage + 1) % totalPages;
    } else if (direction === 'prev') {
      this.currentPage = (this.currentPage - 1 + totalPages) % totalPages;
    }
  }
  
}
