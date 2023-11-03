import { Routes } from '@angular/router';

export const routes: Routes = [
    // { path: '', component: SecureComponent, loadComponent: () => import('../../src/app/layouts/secure/secure.component').then(m => m.SecureComponent)  },
    // { path: '', component: SecureComponent, loadComponent: () => import('../../src/app/layouts/secure/secure.component').then(m => m.SecureComponent)  },
    { path: 'ai-toll-verification', loadComponent: () => import('../../src/app/components/ai-toll-verification/ai-toll-verification.component').then(m => m.AiTollVerificationComponent) },
    { path: 'ai-toll-vehicleUpdate', loadComponent: () => import('../../src/app/components/ai-toll-vehicle-update/ai-toll-vehicle-update.component').then(m => m.AiTollVehicleUpdateComponent) }
  


];
