import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolsPageRoutingModule } from './vols-routing.module';

import { VolsPage } from './vols.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolsPageRoutingModule
  ],
  declarations: [VolsPage]
})
export class VolsPageModule {}
