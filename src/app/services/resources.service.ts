import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {forkJoin, map, mergeMap, Observable} from "rxjs";
import {Resource} from "../model/resource";


@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private readonly baseUrl = 'https://reqres.in/api/unknown';

  constructor(private http: HttpClient) {
  }

  getResources(): Observable<Resource[]> {
    return this.getTotalPages().pipe(
      mergeMap(pages => {
        const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);
        const requests = pageNumbers.map(page => this.getResourcesByPage(page));
        return forkJoin(requests).pipe(
          map(resources => resources.reduce((acc, val) => acc.concat(val)))
        )
      })
    );
  }

  private getResourcesByPage(page: number): Observable<any[]> {
    const url = `${this.baseUrl}?page=${page}`;
    return this.http.get<{ data: Resource[] }>(url).pipe(
      map(response => {
        return response.data
      })
    );
  }

  private getTotalPages(): Observable<number> {
    const url = `${this.baseUrl}`;
    return this.http.get<{ total_pages: number }>(url).pipe(
      map(response => response.total_pages)
    );
  }
}
