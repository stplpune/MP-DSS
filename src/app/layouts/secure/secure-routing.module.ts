import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ExpenseGuard } from 'src/app/core/guards/expense.guard';

const routes: Routes = [
    { path: 'Dashboard', loadComponent: () => import('../../components/dashboard/dashboard.component').then(c => c.DashboardComponent) , data: { breadcrumb: [{ title: 'Dashboard', active: true }] }},
    { path: 'AI-Toll-Verification', loadComponent: () => import('../../components/ai-toll-verification/ai-toll-verification.component').then(c => c.AiTollVerificationComponent) , data: { breadcrumb: [{ title: 'AI Toll Verification', active: true }] }},
    { path: 'AI-Toll-VehicleUpdate', loadComponent: () => import('../../components/ai-toll-vehicle-update/ai-toll-vehicle-update.component').then(c => c.AiTollVehicleUpdateComponent) , data: { breadcrumb: [{ title: 'AI Toll Vehicle Update', active: true }] }},
    { path: 'page-right-access', loadComponent: ()=> import ('../../components/page-right-access/page-right-access.component').then(c => c.PageRightAccessComponent) , data: { breadcrumb: [{ title: 'Page Right Access', active: true }] }},
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
