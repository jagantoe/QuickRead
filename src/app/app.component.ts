import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScanService } from './scan.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  scanService = inject(ScanService);
}
