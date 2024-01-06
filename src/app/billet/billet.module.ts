import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
//import { QRCodeModule } from 'angularx-qrcode';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SharedModule } from '../share.module';
import { BilletPageRoutingModule } from './billet-routing.module';
import { BilletPage } from './billet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BilletPageRoutingModule,
    SharedModule,
    //QRCodeModule
  ],
  declarations: [BilletPage],
  providers: [
    AndroidPermissions,
  ],
})
export class BilletPageModule {

}

