import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';


import { environment } from './environments/environment';

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { IonicStorageModule } from '@ionic/storage-angular';
import { TimeagoModule } from 'ngx-timeago';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), TimeagoModule.forRoot(), ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
  .catch(err => console.log(err));

defineCustomElements(window);