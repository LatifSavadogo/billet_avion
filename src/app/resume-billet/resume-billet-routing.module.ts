import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumeBilletPage } from './resume-billet.page';

const routes: Routes = [
  {
    path: '',
    component: ResumeBilletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumeBilletPageRoutingModule {}
