import { Injectable, effect, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { Scan } from './types/scan';
import { Settings } from './types/settings';

@Injectable({
  providedIn: 'root'
})
export class ScanService {

  private history = signal(null! as Scan[]);
  private settings = signal(null! as Settings);

  public history$ = this.history.asReadonly();
  public settings$ = this.settings.asReadonly();

  constructor(private storageService: StorageService) {
    this.load();
    effect(() => this.saveHistory(this.history()));
    effect(() => this.saveSettings(this.settings()));
  }

  public addScan(scan: Scan) {
    this.history.mutate(history => history.unshift(scan));
  }
  public removeScan(scan: Scan) {
    this.history.mutate(history => history.splice(history.indexOf(scan), 1));
  }
  public clearHistory() {
    this.history.set([]);
  }
  private async saveHistory(history: Scan[]) {
    if (history == null) return;
    await this.storageService.setHistory(history);
  }
  public setDevice(device: string | null) {
    this.settings.mutate(settings => settings.preferedDevice = device);
  }
  public setDecoding(decoding: string | null) {
    this.settings.mutate(settings => settings.preferedDecoding = decoding);
  }
  private async saveSettings(settings: Settings) {
    if (settings == null) return;
    await this.storageService.setSettings(settings);
  }

  private async load() {
    let history = await this.storageService.getHistory();
    this.history.set(history ?? [])
    let settings = await this.storageService.getSettings();
    this.settings.set(settings ?? {})
  }
}
