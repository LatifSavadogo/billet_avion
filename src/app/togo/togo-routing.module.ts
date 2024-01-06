import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TogoPage } from './togo.page';

const routes: Routes = [
  {
    path: '',
    component: TogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TogoPageRoutingModule {}
