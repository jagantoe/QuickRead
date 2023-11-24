import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePage } from '../create/create.page';
import { HistoryPage } from '../history/history.page';
import { ScanPage } from '../scan/scan.page';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'create',
        component: CreatePage
      },
      {
        path: 'scan',
        component: ScanPage
      },
      {
        path: 'history',
        component: HistoryPage
      },
      {
        path: '',
        redirectTo: '/create',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/create',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
