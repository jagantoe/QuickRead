import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScanService } from '../scan.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
