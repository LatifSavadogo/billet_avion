import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MALIPage } from './mali.page';

const routes: Routes = [
  {
    path: '',
    component: MALIPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MALIPageRoutingModule {}
