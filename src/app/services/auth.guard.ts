import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isAuth().pipe(
      tap(estado => {
        if (!estado) { this.router.navigate(['/login']); }
      })
    );
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuth().pipe(
      tap(estado => {
        if (!estado) { this.router.navigate(['/login']); }
      }),
      take(1)
    );
  }

}
