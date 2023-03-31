import {Component, OnInit} from "@angular/core";
import {ResourcesService} from "../../services/resources.service";
import {Resource} from "../../model/resource";

@Component({
  selector: 'all-resources',
  templateUrl: './resources.component.html'
})
export class ResourcesComponent implements OnInit{

  resources: Resource[] = []

  constructor(private resourcesService: ResourcesService) {
  }

  ngOnInit(): void {
    this.resourcesService.getResources().subscribe(resources => {
      this.resources = resources
    })
  }
}
