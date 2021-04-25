import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {IngresoEgreso} from '../../models/ingreso-egreso.model';
import {Subscription} from 'rxjs';
import {IngresoEgresoService} from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[];
  ingresoEgresosSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.ingresoEgresosSubscription = this.store.select('ingresosEgresos').subscribe(({items}) => this.ingresosEgresos = items);
  }

  ngOnDestroy(): void {
    this.ingresoEgresosSubscription.unsubscribe();
  }

  async borrar(uid: string): Promise<void> {
    const ingresoEgreso = this.ingresosEgresos.filter(value => value.uid === uid)[0];
    try {
      await this.ingresoEgresoService.borrrarIngresoEgreso(ingresoEgreso);
      await Swal.fire('Borrado', 'Item Borrado', 'success');
    } catch (e) {
      await Swal.fire('Error', e.message, 'error');
    }
  }
}
