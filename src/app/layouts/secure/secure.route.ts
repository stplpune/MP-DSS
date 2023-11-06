import { Route } from '@angular/router';

export default [
    { path: 'Dashboard', loadComponent: () => import('../../components/dashboard/dashboard.component').then(c => c.DashboardComponent) },
    { path: 'AI-Toll-Verification', loadComponent: () => import('../../components/ai-toll-verification/ai-toll-verification.component').then(c => c.AiTollVerificationComponent) },
    { path: 'AI-Toll-VehicleUpdate', loadComponent: () => import('../../components/ai-toll-vehicle-update/ai-toll-vehicle-update.component').then(c => c.AiTollVehicleUpdateComponent) },
] as Route[];
