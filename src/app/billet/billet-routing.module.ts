import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BilletPage } from './billet.page';

const routes: Routes = [
  {
    path: '',
    component: BilletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BilletPageRoutingModule {}
