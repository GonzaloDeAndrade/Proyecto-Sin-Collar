import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from '../header/header/header.component';
import { MainComponent } from '../main/main/main.component';
import { FooterComponent } from '../footer/footer.component';
import { AsideComponent } from '../aside/aside/aside.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, HeaderComponent, MainComponent, FooterComponent, AsideComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
