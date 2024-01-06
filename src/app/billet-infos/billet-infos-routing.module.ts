import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BilletInfosPage } from './billet-infos.page';

const routes: Routes = [
  {
    path: '',
    component: BilletInfosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BilletInfosPageRoutingModule {}
