import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ScanService } from '../scan.service';
import { Scan } from '../types/scan';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScanPage {
  scanService = inject(ScanService);

  scan = signal<Scan | null>(null);

  process(scan: Scan | null) {
    this.scan.set(scan);
  }

  removed() {
    this.scan.set(null);
  }
}
