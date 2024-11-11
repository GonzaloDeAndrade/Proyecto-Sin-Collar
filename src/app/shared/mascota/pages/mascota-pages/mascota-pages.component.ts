import { Component } from '@angular/core';
import { ListarMascotasComponent } from '../../components/listar-mascotas/listar-mascotas.component';

@Component({
  selector: 'app-mascota-pages',
  standalone: true,
  imports: [ListarMascotasComponent],
  templateUrl: './mascota-pages.component.html',
  styleUrl: './mascota-pages.component.css'
})
export class MascotaPagesComponent {

}
