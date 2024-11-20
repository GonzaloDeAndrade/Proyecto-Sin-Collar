import { Component, inject } from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {
  
    router = inject(Router)
    volverMenu(){
      this.router.navigate(['/home']);
    }
     
}
