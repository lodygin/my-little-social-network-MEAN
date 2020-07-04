import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {User} from '../interfaces'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) {
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/user/current')
  }

  getUserByUd(id: string): Observable<User> {
    return this.http.get<User>(`/api/user/${id}`)
  }
}
