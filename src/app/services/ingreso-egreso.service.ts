import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IngresoEgreso} from '../models/ingreso-egreso.model';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;
    if (ingresoEgreso.uid === '' || ingresoEgreso.uid === undefined) {
      ingresoEgreso.uid = this.firestore.createId();
    }
    return this.firestore
      .collection(`usuarios/${uid}/ingreso-egresos`)
      .doc(ingresoEgreso.uid)
      .set({...ingresoEgreso});
  }

  borrrarIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;
    return this.firestore
      .collection(`usuarios/${uid}/ingreso-egresos`)
      .doc(ingresoEgreso.uid)
      .delete();
  }

  initIngresosEgresosListener(): Observable<any> {
    const uid = this.authService.user.uid;
    return this.firestore.collection(`usuarios/${uid}/ingreso-egresos`)
      .valueChanges();
  }

}
