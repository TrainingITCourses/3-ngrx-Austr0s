import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from './store/reducers';
import {LoadAgencies} from './store/reducers/agencies/agencies.actions';
import {LoadStatuses} from './store/reducers/statuses/statuses.actions';
import {LoadMissionTypes} from './store/reducers/missionTypes/mission-types.actions';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title: string = "Angular Speed: aplicaciones de alto rendimiento";
  public developerVersion = '5';


  constructor(private store: Store<State>, private swUpdate: SwUpdate){
    
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((e: UpdateAvailableEvent) => {
        const msg = "Hay una nueva versión de la aplicación. Acepta para actualizar...";
        if (confirm(msg)) window.location.reload();
      });
    }

  }
  public ngOnInit(): void  {
    this.store.dispatch(new LoadAgencies());
    this.store.dispatch(new LoadStatuses());
    this.store.dispatch(new LoadMissionTypes());
  }
}
