import { Component } from '@angular/core';
import { ScanService } from '../scan.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage {

  history$;
  public clearAlertButtons = [
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
  constructor(public scanService: ScanService) {
    this.history$ = scanService.history$;
  }

  clear() {
    this.scanService.clearHistory();
  }
}
