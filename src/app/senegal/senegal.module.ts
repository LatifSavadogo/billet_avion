import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SenegalPageRoutingModule } from './senegal-routing.module';

import { SenegalPage } from './senegal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SenegalPageRoutingModule
  ],
  declarations: [SenegalPage]
})
export class SenegalPageModule {}
