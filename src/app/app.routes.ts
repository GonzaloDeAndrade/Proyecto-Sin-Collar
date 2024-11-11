import { Routes } from '@angular/router';
import { HomeComponent } from './web/components/home/home.component';
import { MenuAdminComponent } from './admin/components/menu-admin/menu-admin.component';
import { MascotaPagesComponent } from './shared/mascota/pages/mascota-pages/mascota-pages.component';
import { SolicitudesAdopcionComponent } from './shared/mascota/pages/solicitudes-adopcion/solicitudes-adopcion.component';
import { ListarMascotasComponent } from './shared/mascota/components/listar-mascotas/listar-mascotas.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { SolicitudesMascotaComponent } from './shared/mascota/pages/solicitudes-mascota/solicitudes-mascota.component';
import { UsuarioadoptaComponent } from './usuario/usuarioadopta/usuarioadopta.component';
import { UsuariocargaadopcionComponent } from './usuario/usuariocargaadopcion/usuariocargaadopcion.component';
import { AddMascotaComponent } from './shared/mascota/components/add-mascota/add-mascota.component';
import { MyProfileComponent } from './usuario/myprofile/myprofile.component';

export const routes: Routes = [
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'admin',
        component:MenuAdminComponent
    },
    {
        path:'admin/sm',
        component:SolicitudesMascotaComponent
    },
    {
        path:'admin/sa',
        component:SolicitudesAdopcionComponent
    },
    {
        path:'login',
        component:UsuarioComponent
    },
    {
        path:'ruta-mascotas',
        component:MascotaPagesComponent
    },
    {
        path:'agregar-mascota',
        component:AddMascotaComponent
    },
    { path: 'adopta',
        component: UsuarioadoptaComponent 
    },
        { path: 'carga-adopcion', 
            component: UsuariocargaadopcionComponent 
        }
         ,
         {
                path:'profile',
                component: MyProfileComponent
        }
       ,
    {
        path:'**',
        component:HomeComponent
    }
   
   
];
