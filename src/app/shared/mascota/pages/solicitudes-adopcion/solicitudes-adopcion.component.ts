import { Component, EventEmitter, Output } from '@angular/core';
import { ListarMascotasComponent } from '../../components/listar-mascotas/listar-mascotas.component';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-solicitudes-adopcion',
  standalone: true,
  imports: [ListarMascotasComponent],
  templateUrl: './solicitudes-adopcion.component.html',
  styleUrl: './solicitudes-adopcion.component.css'
})
export class SolicitudesAdopcionComponent {
  urlBase = environment.urlBaseAceptadasSA

}
