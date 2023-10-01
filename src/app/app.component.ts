import { Component } from '@angular/core';
import { ScanService } from './scan.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private scanService: ScanService) { }
}
