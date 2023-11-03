import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'ai-toll-verification', loadComponent: () => import('../../components/ai-toll-verification/ai-toll-verification.component').then(m => m.AiTollVerificationComponent) },
  { path: 'ai-toll-vehicleUpdate', loadComponent: () => import('../../components/ai-toll-vehicle-update/ai-toll-vehicle-update.component').then(m => m.AiTollVehicleUpdateComponent) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
