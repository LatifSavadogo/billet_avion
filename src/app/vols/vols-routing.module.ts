import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolsPage } from './vols.page';

const routes: Routes = [
  {
    path: '',
    component: VolsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolsPageRoutingModule {}
