import { Route } from '@angular/router';

export default [
    {path:'',redirectTo:'login',pathMatch:'full'},
    { path: 'login', loadComponent: () => import('../../components/login/login.component').then(c => c.LoginComponent), data: { breadcrumb: [{ title: 'Login', active: true }] }},
    { path: 'home', loadComponent: () => import('../../components/home/home.component').then(c => c.HomeComponent) , data: { breadcrumb: [{ title: 'Home', active: true }] }},
] as Route[];


