import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IngresoEgresoService} from '../services/ingreso-egreso.service';
import {IngresoEgreso} from '../models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import {AppState} from '../app.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {isLoading, stopLoading} from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo = 'ingreso';

  cargando = false;

  cargandoSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.ingresoForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });

    this.cargandoSubscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.cargandoSubscription.unsubscribe();
  }

  async guardar(): Promise<void> {
    if (this.ingresoForm.invalid) {return; }
    const {descripcion, monto} = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    try {
      this.store.dispatch(isLoading());
      await this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso);
      this.store.dispatch(stopLoading());
      await Swal.fire('Registro Creado', descripcion, 'success');
    } catch (e) {
      this.store.dispatch(stopLoading());
      await Swal.fire('Error', e.message, 'error');
    }
  }


}
