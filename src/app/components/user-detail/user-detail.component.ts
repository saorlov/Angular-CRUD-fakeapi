import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit{

  user: User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  }
  sub: Subscription | null = null
  sub1: Subscription | null = null

  isEditable = false
  form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2)
    ]),
  })

  get email() {
    return this.form.controls.email as FormControl
  }

  get firstName() {
    return this.form.controls.firstName as FormControl
  }

  get lastName() {
    return this.form.controls.lastName as FormControl
  }

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      await this.router.navigate(['/login'])
    }
    this.sub = this.usersService.getSingleUser(this.route.snapshot.paramMap.get('id'))
      .subscribe(user => this.user = {...user})
  }

  submit() {
    this.user = {
      ...this.user,
      email: this.form.value.email ? this.form.value.email : this.user.email,
      first_name: this.form.value.firstName ? this.form.value.firstName : this.user.first_name,
      last_name: this.form.value.lastName ? this.form.value.lastName : this.user.last_name,
    }
    this.sub1 = this.usersService.updateUser(this.user).subscribe({
      next: user => this.user = {...user},
      error: err => console.log(err.message()),
    })
    this.isEditable = false
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe()
    if (this.sub1) this.sub1.unsubscribe()
  }
}
