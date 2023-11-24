import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ScanService } from '../scan.service';
import { Scan } from '../types/scan';
import { CamComponent } from '../cam/cam.component';
import { ScanCardComponent } from '../scan-card/scan-card.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-scan',
    templateUrl: './scan.page.html',
    styleUrls: ['./scan.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IonicModule, ScanCardComponent, CamComponent]
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
