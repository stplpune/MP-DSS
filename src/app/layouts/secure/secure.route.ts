import { Route } from '@angular/router';

export default [
    { path: 'dashboard', loadComponent: () => import('../../components/dashboard/dashboard.component').then(c => c.DashboardComponent) },
    { path: 'ai-toll-verification', loadComponent: () => import('../../components/ai-toll-verification/ai-toll-verification.component').then(c => c.AiTollVerificationComponent) },
    { path: 'ai-toll-vehicleUpdate', loadComponent: () => import('../../components/ai-toll-vehicle-update/ai-toll-vehicle-update.component').then(c => c.AiTollVehicleUpdateComponent) },
] as Route[];
