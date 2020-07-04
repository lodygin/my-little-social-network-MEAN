import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../shared/services/auth.service'
import {Subscription} from 'rxjs'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription
  rSub: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {

    this.authService.logout()

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.rSub = this.route.queryParams
      .subscribe((params: Params) => {
        if (params['registered']) {
          this.snackBar.open('Теперь вы можете зайти в систему.', null, {
            duration: 3000,
            panelClass: ['snackBarPanel']
          })
        } else if (params['accessDenied']) {
          this.snackBar.open('Для начала авторизуйтесь в системе.', null, {
            duration: 3000,
            panelClass: ['snackBarPanel']
          })
        } else if (params['sessionFailed']) {
          this.snackBar.open('Пожалуйста, войдти в систему заного.', null, {
            duration: 3000,
            panelClass: ['snackBarPanel']
          })
        }
      })
  }

  onSubmit(): void {
    this.form.disable()
    this.aSub = this.authService.login(this.form.value)
      .subscribe(
        () => {
          this.router.navigate(['/feed'])
        },
        err => {
          this.snackBar.open(err.error.message, null, {
            duration: 3000,
            panelClass: ['snackBarPanel']
          })
          this.form.enable()
        })
  }

  ngOnDestroy(): void {
    if (this.aSub) this.aSub.unsubscribe()
    if (this.rSub) this.rSub.unsubscribe()
  }
}
