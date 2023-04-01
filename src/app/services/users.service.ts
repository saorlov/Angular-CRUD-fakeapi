import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, mergeMap, map, forkJoin,} from "rxjs";
import { User } from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.getTotalPages()
      .pipe(
        mergeMap(pages => {
          const pageNumbers = Array.from({length: pages}, (_, i) => i + 1);
          const requests = pageNumbers.map(page => this.getUsersByPage(page));
          return forkJoin(requests)
            .pipe(map(users => users.reduce((acc, val) => acc.concat(val))));
        })
      );
  }

  private getUsersByPage(page: number): Observable<any[]> {
    const url = `${this.baseUrl}?page=${page}`;
    return this.http
      .get<{ data: User[] }>(url)
      .pipe(map(response => response.data));
  }

  private getTotalPages(): Observable<number> {
    const url = `${this.baseUrl}`;
    return this.http
      .get<{ total_pages: number }>(url)
      .pipe(map(response => response.total_pages));
  }

  getSingleUser(id: number | string | null): Observable<User> {
    return this.http
      .get<{ data: User }>(`${this.baseUrl}/${id}`)
      .pipe(map(response => response.data))
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .put<User>(`${this.baseUrl}/${user.id}`, user)
      .pipe(map(response => response))
  }

  deleteUser(id: number | string) {

    this.http
      .delete(`${this.baseUrl}/${id}`, { observe: 'response' })
      .subscribe(
      response => {
        console.log(`request status: ${response.status}`)
      }
    )

  }
}

