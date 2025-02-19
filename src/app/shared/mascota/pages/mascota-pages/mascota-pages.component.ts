import { Component, EventEmitter, Output } from '@angular/core';
import { ListarMascotasComponent } from '../../components/listar-mascotas/listar-mascotas.component';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-mascota-pages',
  standalone: true,
  imports: [ListarMascotasComponent],
  templateUrl: './mascota-pages.component.html',
  styleUrl: './mascota-pages.component.css'
})
export class MascotaPagesComponent {

  urlBase = environment.urlBaseAceptadasSM;
  

}
