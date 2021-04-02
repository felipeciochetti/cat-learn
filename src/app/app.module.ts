import { ModuleEditComponent } from './components/module-edit/module-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { NavComponent } from './nav/nav.component';
import { SearchToolbarComponent } from './components/search-toolbar/search-toolbar.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CreateModulesComponent } from './components/create-modules/create-modules.component';
import { CreateLessonComponent } from './components/create-lesson/create-lesson.component';
import { MessagesComponent } from './components/messages/messages.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { ModuleDetailComponent } from './components/module-detail/module-detail.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { Data } from './model/data';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PdfViewerModule } from 'ng2-pdf-viewer';



import {
  MatNativeDateModule,
  MatRippleModule,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ToastComponent } from './components/toast/toast.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
 

const routes: Routes = [
  { path: 'new-course', component: CreateCourseComponent },
  { path: ':idCourse/new-module', component: CreateModulesComponent },
  { path: ':idCourse/:idModule/new-lesson', component: CreateLessonComponent },

  { path: 'courses/:id', component: CourseEditComponent },
  { path: 'module/:idCourse/:idModule', component: ModuleEditComponent },
  { path: 'lesson/:idCourse/:idModule/:idLesson', component: LessonComponent },

  {
    path: 'edit-course/:idCourse',
    component: CreateCourseComponent
  },
  {
    path: 'edit-lesson/:idCourse/:idModule/:idLesson',
    component: CreateLessonComponent
  },
  {
    path: 'edit-module/:idCourse/:idModule',
    component: CreateModulesComponent
  },

  { path: 'courses', component: CourseListComponent },
  { path: 'search/:keyword', component: CourseListComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/courses', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    HeaderComponent,
    CourseListComponent,
    CourseDetailComponent,

    NavComponent,
    SearchToolbarComponent,
    CreateCourseComponent,
    CreateModulesComponent,
    CreateLessonComponent,
    MessagesComponent,
    CourseEditComponent,
    ModuleDetailComponent,
    ModuleEditComponent,
    LessonComponent,
    ConfirmDialogComponent,
    ToastComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CurrencyMaskModule,
    /*
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true
    }),
*/
    BrowserAnimationsModule,
    YouTubePlayerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTooltipModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    FormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatExpansionModule,
    PdfViewerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-br' }],
  bootstrap: [AppComponent],
  entryComponents: [ToastComponent]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
