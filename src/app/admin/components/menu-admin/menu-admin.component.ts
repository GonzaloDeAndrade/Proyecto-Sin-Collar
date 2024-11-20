import { Component, inject } from '@angular/core';
import { MascotaPagesComponent } from '../../../shared/mascota/pages/mascota-pages/mascota-pages.component';
import { UpdateMascotaPagesComponent } from '../../../shared/mascota/pages/update-mascota-pages/update-mascota-pages.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [MascotaPagesComponent,UpdateMascotaPagesComponent,CommonModule,RouterOutlet],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {
  
    router = inject(Router)
    volverMenu(){
      this.router.navigate(['/home']);
    }
     
}
