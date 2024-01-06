import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TogoPageRoutingModule } from './togo-routing.module';

import { TogoPage } from './togo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TogoPageRoutingModule
  ],
  declarations: [TogoPage]
})
export class TogoPageModule {}
