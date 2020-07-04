import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Subscription} from 'rxjs'
import {AuthService} from '../shared/services/auth.service'
import {Router} from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {

    this.authService.logout()

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      nickname: new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
  }

  onSubmit(): void {
    this.form.disable()
    console.log(this.form.value)
    this.aSub = this.authService.register(this.form.value)
      .subscribe(
        () => {
          this.router.navigate(['/login'], {
            queryParams: {
              registered: true
            }
          })
        },
        err => {
          this.snackBar.open(err.error.message, null, {
            duration: 3000,
            panelClass: ['snackBarPanel']
          })
          this.form.enable()
        }
      )
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }
}
