import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { ScanService } from '../scan.service';
import { Scan } from '../types/scan';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  scan: Scan | null = null;
  settings$;
  constructor(private scanService: ScanService) {
    this.settings$ = this.scanService.settings$;
  }

  ngOnInit() {
  }

  scanner!: NgxScannerQrcodeComponent;
  @ViewChild("action")
  public set _scanner(s: NgxScannerQrcodeComponent) {
    this.scanner = s;
    if (s) {
      setTimeout(() => {
        let settings = this.settings$();
        if (settings.preferedDevice) this.scanner.playDevice(settings.preferedDevice);
        if (settings.preferedDecoding) this.scanner.decode = settings.preferedDecoding;
        this.scanner.start();
      }, 10);
    }
  }

  changeDevice(event: any) {
    let device = event.target.value;
    this.scanner.playDevice(device);
    this.scanService.setDevice(device);
  }

  changeDecoding(event: any) {
    let decoding = event.target.value;
    this.scanner.decode = decoding;
    this.scanService.setDecoding(decoding);
  }

  handleScan(result: ScannerQRCodeResult[]) {
    this.scan = { time: new Date(), value: result[0].value };
    this.scanner.stop();
    this.scanService.addScan(this.scan);
  }
}
