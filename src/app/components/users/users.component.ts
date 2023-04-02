import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User} from "../../model/user";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'all-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {

  title = 'users';
  users: User[] = [];
  sub: Subscription | null = null

  constructor(
    private usersService: UsersService,
    private router: Router,
    private auth: AuthService
  ) {
  }

  async ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      await this.router.navigate(['/login'])
    }
    this.sub = this.usersService.getUsers()
      .subscribe(users => this.users = users);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe()
  }

  deleteUser(id: number | string) {
    // console.log(`delete user ${id}`)
    this.usersService.deleteUser(id);
    this.users.splice(this.users.findIndex(user => user.id === id), 1)
  }
}
