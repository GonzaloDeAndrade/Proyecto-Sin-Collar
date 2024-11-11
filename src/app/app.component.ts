import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './web/components/home/home.component';
import { MenuAdminComponent } from './admin/components/menu-admin/menu-admin.component';
import { ListarMascotasComponent } from './shared/mascota/components/listar-mascotas/listar-mascotas.component';
import { MascotaPagesComponent } from './shared/mascota/pages/mascota-pages/mascota-pages.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HomeComponent,
    MenuAdminComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sin-collar';
}
