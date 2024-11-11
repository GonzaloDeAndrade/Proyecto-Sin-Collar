import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './web/components/home/home.component';
import { MenuAdminComponent } from './admin/components/menu-admin/menu-admin.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./web/components/footer/footer.component";
import { NavComponent } from './web/components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HomeComponent,
    MenuAdminComponent,
    CommonModule, FooterComponent,NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sin-collar';
  constructor(private router: Router) {}

  mostrarNavFooter(): boolean {
    return this.router.url.includes('/admin') !== true ;
  }
}

