import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: [ 'home.page.scss' ],
})
export class HomePage implements OnInit {
  
  @ViewChild(IonContent, { static: true }) content!: IonContent;
  constructor() {}
  ngOnInit() {  }


}
