import { Routes } from '@angular/router';
import { SecureComponent } from './layouts/secure/secure.component';
import { PublicComponent } from './layouts/public/public.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    loadChildren: () => import('./layouts/public/public.route')
  },
  {
    path: '',
    component: SecureComponent,
    loadChildren: () => import('./layouts/secure/secure.route')
  },

];
