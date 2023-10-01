import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScanService } from '../scan.service';
import { Scan } from '../types/scan';

@Component({
  selector: 'app-scan-card',
  templateUrl: './scan-card.component.html',
  styleUrls: ['./scan-card.component.scss'],
})
export class ScanCardComponent {
  constructor(private scanService: ScanService) { }

  @Input({ required: true }) scan!: Scan
  @Output() copied = new EventEmitter<any>();

  copy(value: string) {
    navigator.clipboard.writeText(value);
    this.copied.next(null);
  }

  remove(scan: Scan) {
    this.scanService.removeScan(scan);
  }
}
