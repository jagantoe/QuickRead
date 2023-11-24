import { Component, EventEmitter, OnDestroy, Output, ViewChild, inject } from '@angular/core';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult, NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { filter, firstValueFrom, share, timer } from 'rxjs';
import { ScanService } from '../scan.service';
import { Scan } from '../types/scan';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-cam',
    templateUrl: './cam.component.html',
    styleUrls: ['./cam.component.scss'],
    standalone: true,
    imports: [NgxScannerQrcodeModule, IonicModule]
})
export class CamComponent implements OnDestroy {

  scanService = inject(ScanService);

  @Output() finished = new EventEmitter<Scan | null>();

  settings$ = this.scanService.settings$;
  scanner!: NgxScannerQrcodeComponent;
  scannerStarted$ = timer(10, 10).pipe(filter(x => this.scanner.isStart), share());
  scanned = false;

  @ViewChild("action", { static: true })
  public set _scanner(s: NgxScannerQrcodeComponent) {
    this.scanner = s;
    if (s) {
      this.scanner.start()
      this.setSettings();
    }
  }

  async setSettings() {
    await firstValueFrom(this.scannerStarted$);
    let settings = this.settings$();
    if (settings.preferedDevice) this.scanner.playDevice(settings.preferedDevice);
    if (settings.preferedDecoding) this.scanner.decode = settings.preferedDecoding;
  }

  async ngOnDestroy(): Promise<void> {
    if (!this.scanned) {
      await firstValueFrom(this.scannerStarted$);
      this.scanner.stop();
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

  async handleScan(result: ScannerQRCodeResult[]) {
    let scan = { time: new Date(), value: result[0].value };
    this.scanner.stop();
    this.scanService.addScan(scan);
    this.scanned = true;
    this.finished.emit(scan);
  }

  close() {
    this.finished.emit(null);
  }
}
