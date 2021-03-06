import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {IngresoEgresoComponent} from './ingreso-egreso.component';
import {EstadisticaComponent} from './estadistica/estadistica.component';
import {DetalleComponent} from './detalle/detalle.component';
import {OrdenIngresoEgresoPipe} from '../pipes/orden-ingreso-egreso.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutesModule} from '../dashboard/dashboard-routes.module';
import {StoreModule} from '@ngrx/store';
import {ingresoEgresoReducer} from './ingreso-egreso.reducer';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class IngresoEgresoModule { }
