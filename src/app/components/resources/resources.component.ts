import {Component, OnDestroy, OnInit} from "@angular/core";
import {ResourcesService} from "../../services/resources.service";
import {Resource} from "../../model/resource";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'all-resources',
  templateUrl: './resources.component.html'
})
export class ResourcesComponent implements OnInit, OnDestroy{

  resources: Resource[] = []
  sub: Subscription | null = null

  constructor(
    private resourcesService: ResourcesService,
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe()
  }

  async ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      await this.router.navigate(['/login'])
    }
    this.sub = this.resourcesService.getResources().subscribe(resources => {
      this.resources = resources
    })
  }
}
