import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Usuario} from '../models/usuario.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import * as actions from '../auth/auth.actions';
import {unSetUser} from '../auth/auth.actions';
import {unsetItems} from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioSubscription: Subscription;
  user: Usuario;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {

  }

  initAuthListener(): void {
    this.auth.authState.subscribe((firebaseUser: any) => {
      if (firebaseUser) {
        this.usuarioSubscription = this.firestore.doc(`usuarios/${firebaseUser.uid}`).valueChanges().subscribe((value: any) => {
          console.log(value);
          const newUser = new Usuario(value.uid, value.nombre, value.email);
          console.log(newUser);

          this.user = newUser;
          this.store.dispatch(actions.setUser({user: newUser}));
        });
      } else {
        this.user = null;
        this.usuarioSubscription?.unsubscribe();
        this.store.dispatch(unSetUser());
        this.store.dispatch(unsetItems());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        const newUser = new Usuario(user.uid, nombre, user.email);
        return this.firestore.doc(`usuarios/${user.uid}`).set({...newUser});
      });
  }

  loginrUsuario(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<any> {
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(value => value !== null)
    );
  }


}
