import { Route } from '@angular/router';

export default [
    { path: 'Dashboard', loadComponent: () => import('../../components/dashboard/dashboard.component').then(c => c.DashboardComponent) , data: { breadcrumb: [{ title: 'Dashboard', active: true }] }},
    { path: 'AI-Toll-Verification', loadComponent: () => import('../../components/ai-toll-verification/ai-toll-verification.component').then(c => c.AiTollVerificationComponent) , data: { breadcrumb: [{ title: 'AI Toll Verification', active: true }] }},
    { path: 'AI-Toll-VehicleUpdate', loadComponent: () => import('../../components/ai-toll-vehicle-update/ai-toll-vehicle-update.component').then(c => c.AiTollVehicleUpdateComponent) , data: { breadcrumb: [{ title: 'AI Toll Vehicle Update', active: true }] }},
    { path: 'page-right-access', loadComponent: ()=> import ('../../components/user-access/user-access.component').then(c => c.UserAccessComponent) , data: { breadcrumb: [{ title: 'Page Access', active: true }] }},
] as Route[];
