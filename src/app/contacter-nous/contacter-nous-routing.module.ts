import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContacterNousPage } from './contacter-nous.page';

const routes: Routes = [
  {
    path: '',
    component: ContacterNousPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContacterNousPageRoutingModule {}
