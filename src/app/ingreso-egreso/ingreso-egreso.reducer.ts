import {Usuario} from '../models/usuario.model';
import {createReducer, on} from '@ngrx/store';
import {IngresoEgreso} from '../models/ingreso-egreso.model';
import {setItems, unsetItems} from './ingreso-egreso.actions';
import {AppState} from '../app.reducer';


export interface State {
  items: IngresoEgreso[];
}

export interface AppStateWithIngresoEgreso extends AppState {
  ingresosEgresos: State;
}

export const initialState: State = {
  items: []
};

// tslint:disable-next-line:variable-name
const _ingresoEgresoReducer = createReducer(
  initialState,
  on(setItems, (state, {items}) => ({...state, items: [...items]})),
  on(unsetItems, (state) => ({...state, items: []})),
);

export function ingresoEgresoReducer(state, action) {
  return _ingresoEgresoReducer(state, action);
}
