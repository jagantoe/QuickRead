import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { TimeagoModule } from "ngx-timeago";
import { ScanCardComponent } from "./scan-card/scan-card.component";

@NgModule({
    imports: [
        IonicModule,
        RouterModule,
        TimeagoModule,
        ScanCardComponent
    ],
    exports: [
        ScanCardComponent
    ]
})
export class SharedModule { }