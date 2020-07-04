import {Component, OnDestroy, OnInit} from '@angular/core'
import {PostsService} from '../shared/services/posts.service'
import {Post} from '../shared/interfaces'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit, OnDestroy {

  posts: Post[]
  private psSub: Subscription
  private pSub: Subscription

  constructor(
    private postsService: PostsService
  ) {
  }

  ngOnInit(): void {
    this.postsService.getAllPosts()
      .subscribe((posts: Post[]) => {
        this.posts = posts
      })

    this.postsService.listenNewPost()
      .subscribe((post: Post) => {
        this.posts.unshift(post)
      })
  }

  ngOnDestroy(): void {
    if (this.psSub) this.psSub.unsubscribe()
    if (this.pSub) this.pSub.unsubscribe()
  }

}
