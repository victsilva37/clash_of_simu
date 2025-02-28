import { Routes } from '@angular/router';
import { LoginTagComponent } from './pages/login-tag/login-tag.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SimulacionesComponent } from './pages/simulaciones/simulaciones.component';

export const routes: Routes = [
    {path: '', component: LoginTagComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'simulaciones', component: SimulacionesComponent},
];
