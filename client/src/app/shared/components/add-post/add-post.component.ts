import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {MatDialogRef} from '@angular/material/dialog'
import {PostsService} from '../../services/posts.service'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit, OnDestroy {

  @ViewChild('inputImg') inputImgRef: ElementRef
  image: File
  imagePreview: ArrayBuffer | string
  form: FormGroup
  pSub: Subscription

  constructor(
    private dialogAddPost: MatDialogRef<AddPostComponent>,
    private postsService: PostsService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required])
    })
  }

  triggerClick(): void {
    this.inputImgRef.nativeElement.click()
  }

  onFileUpload(event: Event | any): void {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }

  onSubmit(): void {
    this.form.disable()

    const title: string = this.form.value.title.trim()
    const content: string = this.form.value.content.trim()

    if (title && content) {

      this.pSub = this.postsService.createPost(title, content, this.image)
        .subscribe(() => {
          this.dialogAddPost.close()
        })

    } else {
      if (!title) {
        this.form.reset({content})
        this.form.enable()
        return

      } else if (!content) {
        this.form.reset({title})
        this.form.enable()
        return
      }

      this.form.reset()
      this.form.enable()
      return
    }
  }

  ngOnDestroy(): void {
    if (this.pSub) this.pSub.unsubscribe()
  }
}
