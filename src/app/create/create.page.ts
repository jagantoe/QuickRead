import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { ScanService } from '../scan.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePage implements ViewWillEnter {
  route = inject(ActivatedRoute);
  scanService = inject(ScanService);

  message = signal("");
  private innerWidth = window.innerWidth;
  private innerHeight = window.innerHeight;
  private maxModalHeight = 595; // On desktop modal is only 600px minus 5px to prevent scroll
  width = this.innerWidth > this.maxModalHeight ? this.maxModalHeight : this.innerHeight < this.innerWidth ? this.innerHeight : this.innerWidth;

  ionViewWillEnter() {
    var message = this.route.snapshot.queryParamMap.get('message');
    if (message) {
      this.message.set(message);
    }
  }

  save() {
    this.scanService.addScan({ time: new Date(), value: this.message() });
  }
}
