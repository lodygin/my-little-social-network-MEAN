import {Component, Input, OnDestroy, OnInit} from '@angular/core'
import {Post, User} from '../../interfaces'
import {UsersService} from '../../services/users.service'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() post: Post
  authorNickname: string
  authorImageSrc: string
  uSub: Subscription

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.usersService.getUserByUd(this.post.userId)
      .subscribe((user: User) => {
        this.authorNickname = user.nickname
        this.authorImageSrc = user.imageSrc
      })
  }

  ngOnDestroy(): void {
    if (this.uSub) this.uSub.unsubscribe()
  }

}
