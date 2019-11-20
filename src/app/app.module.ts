import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AngularFireModule } from "@angular/fire";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { MarkdownModule, MarkedOptions } from "ngx-markdown";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { AuthGuard } from "./guards/auth.guard";
import { AuthFacade } from "./+state/auth.facade";
import { AdminGuard } from "./guards/admin.guard";
import { QuizFacade } from "./+state/quiz.facade";
import { AuthEffects } from "./+state/auth.effects";
import { QuizEffects } from "./+state/quiz.effects";
import { AuthService } from "./services/auth.service";
import { QuizService } from "./services/quiz.service";
import { UserService } from "./services/user.service";
import { ROOT_REDUCERS, metaReducers } from "./+state";
import { AppRoutingModule } from "./app-routing.module";
import { environment } from "src/environments/environment";
import { EditQuizPageComponent } from "./containers/edit-quiz-page/edit-quiz-page.component";
import { QuizzesPageComponent } from "./containers/quizzes-page/quizzes.component";
import { LandingPageComponent } from "./containers/landing-page/landing-page.component";
import { TakeQuizPageComponent } from "./containers/take-quiz-page/take-quiz-page.component";
import { QuizMetricsPageComponent } from "./containers/quiz-metrics-page/quiz-metrics-page.component";

@NgModule({
  imports: [
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers: metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([AuthEffects, QuizEffects]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          sanitize: false
        }
      }
    })
  ],
  providers: [
    AuthGuard,
    AuthFacade,
    AdminGuard,
    QuizFacade,
    AuthEffects,
    AuthService,
    UserService,
    QuizService
  ],
  declarations: [
    AppComponent,
    LandingPageComponent,
    QuizzesPageComponent,
    EditQuizPageComponent,
    TakeQuizPageComponent,
    QuizMetricsPageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
