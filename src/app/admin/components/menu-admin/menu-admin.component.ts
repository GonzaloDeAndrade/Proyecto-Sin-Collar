import { Component } from '@angular/core';
import { MascotaPagesComponent } from '../../../shared/mascota/pages/mascota-pages/mascota-pages.component';
import { UpdateMascotaPagesComponent } from '../../../shared/mascota/pages/update-mascota-pages/update-mascota-pages.component';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [MascotaPagesComponent,UpdateMascotaPagesComponent],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {
      
}
