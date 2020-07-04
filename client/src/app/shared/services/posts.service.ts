import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, Subject} from 'rxjs'
import {Post} from '../interfaces'
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  newPostUpdate: Subject<Post> = new Subject<Post>()

  constructor(
    private http: HttpClient
  ) {
  }

  createPost(title: string, content: string, image?: File): Observable<Post> {
    const fd: FormData = new FormData()

    fd.append('title', title)
    fd.append('content', content)
    if (image) fd.append('image', image, image.name)

    return this.http.post<Post>('/api/post', fd)
      .pipe(
        tap((post: Post) => {
          this.newPostUpdate.next(post)
        })
      )
  }

  listenNewPost(): Subject<Post> {
    return this.newPostUpdate
  }

  getAllPosts() {
    return this.http.get('/api/post')
  }
}
