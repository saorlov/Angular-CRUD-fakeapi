import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
  title = 'centr test app'

  constructor(
    private router: Router,
    public auth: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  async  logOut() {
    await this.router.navigate(['login'])
    this.auth.logOut()
  }
}
