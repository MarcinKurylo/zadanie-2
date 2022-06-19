import { EventEmitter, Injectable } from '@angular/core';
import { AppEvent } from '../types/event.type';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  event: EventEmitter<AppEvent> = new EventEmitter()

  constructor() { }

  public emit(event: AppEvent) {
    this.event.emit(event)
  }
}
