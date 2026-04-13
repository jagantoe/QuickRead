import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScanService } from '../scan.service';
import { ScanCardComponent } from '../scan-card/scan-card.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IonicModule, ScanCardComponent]
})
export class HistoryPage {
  scanService = inject(ScanService);

  history$ = this.scanService.history$;
  clearAlertButtons = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.clear()
      },
    },
  ];

  clear() {
    this.scanService.clearHistory();
  }
}
