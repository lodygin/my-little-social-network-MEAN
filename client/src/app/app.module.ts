import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {LoginPageComponent} from './login-page/login-page.component'
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component'
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input'
import {RegisterPageComponent} from './register-page/register-page.component'
import {ReactiveFormsModule} from '@angular/forms'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {TokenInterceptor} from './shared/classes/token.interceptor'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {FeedPageComponent} from './feed-page/feed-page.component'
import {MatIconModule} from '@angular/material/icon'
import {ProfilePageComponent} from './profile-page/profile-page.component'
import {AddPostComponent} from './shared/components/add-post/add-post.component'
import {MatDialogModule} from '@angular/material/dialog'
import {PostComponent} from './shared/components/post/post.component'
import {TimeControllerPipe} from './shared/classes/time-controller.pipe';
import { SetImageComponent } from './shared/components/set-image/set-image.component';
import { LoaderComponent } from './shared/components/loader/loader.component'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    FeedPageComponent,
    ProfilePageComponent,
    AddPostComponent,
    PostComponent,
    TimeControllerPipe,
    SetImageComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
