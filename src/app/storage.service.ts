import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, firstValueFrom, from, shareReplay } from 'rxjs';
import { Scan } from './types/scan';
import { Settings } from './types/settings';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private ionicStorage = inject(Storage);

  private storage$: Observable<Storage> = from(this.ionicStorage.create()).pipe(shareReplay(1));

  public get storage(): Promise<Storage> {
    return firstValueFrom(this.storage$);
  }

  private readonly history_key = "history";
  public async getHistory(): Promise<Scan[]> {
    return (await this.storage).get(this.history_key) as Promise<Scan[]>;
  }
  public async setHistory(history: Scan[]): Promise<any> {
    return (await this.storage).set(this.history_key, history);
  }

  private readonly settings_key = "settings";
  public async getSettings(): Promise<Settings> {
    return (await this.storage).get(this.settings_key) as Promise<Settings>;
  }
  public async setSettings(settings: Settings): Promise<any> {
    return (await this.storage).set(this.settings_key, settings);
  }

  public async clear(): Promise<void> {
    return (await this.storage).clear();
  }
}
