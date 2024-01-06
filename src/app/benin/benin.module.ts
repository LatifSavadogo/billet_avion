import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeninPageRoutingModule } from './benin-routing.module';

import { BeninPage } from './benin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeninPageRoutingModule
  ],
  declarations: [BeninPage]
})
export class BeninPageModule {}
