import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { File } from '@ionic-native/file/ngx'; // Assurez-vous d'utiliser le chemin correct
import { ResumeBilletPageRoutingModule } from './resume-billet-routing.module';

import { BilletPage } from '../billet/billet.page';
import { ResumeBilletPage } from './resume-billet.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumeBilletPageRoutingModule
  ],
  declarations: [ResumeBilletPage],
  providers:[BilletPage,  File]
})
export class ResumeBilletPageModule {}
