import {Injectable} from '@angular/core'
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {AuthService} from '../services/auth.service'
import {catchError} from 'rxjs/operators'
import {Router} from '@angular/router'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      req = req.clone({setHeaders: {Authorization: this.authService.getToken()}})
    }
    return next.handle(req)
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleAuthError(err))
      )
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this.router.navigate(['/login'], {
        queryParams: {
          sessionFailed: true
        }
      })
    }
    return throwError(err)
  }

}
