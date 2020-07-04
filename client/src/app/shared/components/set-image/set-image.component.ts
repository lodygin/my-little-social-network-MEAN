import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {FormGroup} from '@angular/forms'

@Component({
  selector: 'app-set-image',
  templateUrl: './set-image.component.html',
  styleUrls: ['./set-image.component.scss']
})
export class SetImageComponent implements OnInit {

  @ViewChild('inputImg') inputImgRef: ElementRef
  image: File
  imagePreview: ArrayBuffer | string

  constructor() { }

  ngOnInit(): void {
  }

  onFileUpload(event: Event) {

  }

  triggerClick() {

  }
}
