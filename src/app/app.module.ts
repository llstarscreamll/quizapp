import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AngularFireModule } from "@angular/fire";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { MarkdownModule, MarkedOptions } from "ngx-markdown";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppComponent } from "./app.component";
import { AuthFacade } from "./+state/auth.facade";
import { AuthEffects } from "./+state/auth.effects";
import { QuizFacade } from "./+state/quiz.facade";
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

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
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
    AngularFirestoreModule.enablePersistence(),
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
    AuthFacade,
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
    EditQuizPageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
