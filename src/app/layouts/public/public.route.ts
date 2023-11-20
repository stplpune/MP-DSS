import { Route } from '@angular/router';

export default [
    {path:'',redirectTo:'login',pathMatch:'full'},
    { path: 'login', loadComponent: () => import('../../components/login/login.component').then(c => c.LoginComponent) },
    { path: 'home', loadComponent: () => import('../../components/home/home.component').then(c => c.HomeComponent) },
] as Route[];


