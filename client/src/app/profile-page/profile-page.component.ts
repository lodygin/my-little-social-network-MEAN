import {Component, OnDestroy, OnInit} from '@angular/core'
import {UsersService} from '../shared/services/users.service'
import {User} from '../shared/interfaces'
import {Subscription} from 'rxjs'
import {MatDialog} from '@angular/material/dialog'
import {SetImageComponent} from '../shared/components/set-image/set-image.component'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  currentUser: User
  uSub: Subscription

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.uSub = this.usersService.getCurrentUser()
      .subscribe((user: User) => {
        this.currentUser = user
      })
  }

  onSetImage(): void {
    this.dialog.open(SetImageComponent, {
      width: '600px',
      autoFocus: false,
      restoreFocus: false,
      closeOnNavigation: false
    })
  }

  ngOnDestroy(): void {
    if (this.uSub) this.uSub.unsubscribe()
  }
}
