import {Pipe, PipeTransform} from '@angular/core'
import * as moment from 'moment'

@Pipe({
  name: 'timeController'
})
export class TimeControllerPipe implements PipeTransform {
  transform(date: Date): string {
    return moment(new Date(date)).fromNow()
  }
}
