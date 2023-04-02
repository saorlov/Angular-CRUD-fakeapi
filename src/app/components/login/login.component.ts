import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoginUser} from "../../model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  token = ''
  error = null
  loginUser: LoginUser = {}
  hide = true
  sub: Subscription | null = null

  form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ])
  })

  getErrorMessage() {
    return this.form.controls.email.invalid ? 'Write down right email' : ''
  }

  get email() {
    return this.form.controls.email as FormControl
  }
  get password() {
    return this.form.controls.password as FormControl
  }

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe()
  }

  async submit() {
    this.loginUser = {
      email: this.form.controls.email.valid ? this.form.value.email: '',
      password: this.form.controls.password.valid ? this.form.value.password : '',
    }
    if (this.form.controls.email.valid && this.form.controls.password.valid) {
      this.auth.login(this.loginUser).subscribe(() => {
        this.router.navigate([''])
      })

    }
  }

  async ngOnInit() {
    if (this.auth.isAuthenticated()) {
      await this.router.navigate([''])
    }
  }
}
