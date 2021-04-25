import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {IngresoEgresoService} from '../services/ingreso-egreso.service';
import {setItems} from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  ingresosEgresosSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(value => {
        this.ingresosEgresosSubscription = this.ingresoEgresoService.initIngresosEgresosListener()
          .subscribe(ingresosEgresos => {
            console.log(ingresosEgresos);
            this.store.dispatch(setItems({items: ingresosEgresos}));
          });
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.ingresosEgresosSubscription.unsubscribe();
  }

}
