import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  login() {
    if (this.loginForm.invalid) {return; }

    Swal.fire({
      title: 'Espere porfavor',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const {correo, password} = this.loginForm.value;
    this.authService.loginrUsuario(correo, password)
      .then(value => {
        console.log(value);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch(reason => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: reason.message,
        });
      });
  }
}
