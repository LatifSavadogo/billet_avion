import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GhanaPage } from './ghana.page';

const routes: Routes = [
  {
    path: '',
    component: GhanaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GhanaPageRoutingModule {}
