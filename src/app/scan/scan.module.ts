import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanPageRoutingModule } from './scan-routing.module';

import { LOAD_WASM, NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { CamComponent } from '../cam/cam.component';
import { SharedModule } from '../shared.module';
import { ScanPage } from './scan.page';

LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res));

@NgModule({
  declarations: [ScanPage, CamComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanPageRoutingModule,
    NgxScannerQrcodeModule,
    SharedModule
  ]
})
export class ScanPageModule { }
