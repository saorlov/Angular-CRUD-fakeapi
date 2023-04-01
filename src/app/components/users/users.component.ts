import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User} from "../../model/user";

@Component({
  selector: 'all-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  title = 'users';
  users: User[] = [];

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.getUsers()
      .subscribe(users => this.users = users);
  }

  deleteUser(id: number | string) {
    // console.log(`delete user ${id}`)
    this.usersService.deleteUser(id);
    this.users.splice(this.users.findIndex(user => user.id === id), 1)
  }
}
