import {Component, OnInit} from '@angular/core'
import {MatDialog} from '@angular/material/dialog'
import {AddPostComponent} from '../../components/add-post/add-post.component'
import {Router} from '@angular/router'
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  addPost(): void {
    this.dialog.open(AddPostComponent, {
      width: '600px',
      autoFocus: false,
      restoreFocus: false,
      closeOnNavigation: false
    })
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
