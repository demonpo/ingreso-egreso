import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AppState} from '../../app.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;

  userSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter(({user}) => user !== null)
      )
      .subscribe(({user}) => {
      console.log(user);
      this.nombre = user.nombre;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.auth.logout()
      .then(value => {
        this.router.navigate(['/login']);
      })
      .catch(reason => {

      });
  }

}
