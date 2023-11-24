import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { TimeagoModule } from 'ngx-timeago';

import { HistoryPage } from './history.page';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    TimeagoModule,
    HistoryPage
]
})
export class HistoryPageModule { }
