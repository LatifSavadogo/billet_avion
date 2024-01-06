import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GhanaPageRoutingModule } from './ghana-routing.module';

import { GhanaPage } from './ghana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GhanaPageRoutingModule
  ],
  declarations: [GhanaPage]
})
export class GhanaPageModule {}
