import { Papa } from "ngx-papaparse";
import { Component, OnInit } from "@angular/core";
import { AuthFacade } from "src/app/+state/auth.facade";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Quiz } from "src/app/models/quiz";
import { QuizFacade } from "src/app/+state/quiz.facade";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"]
})
export class LandingPageComponent implements OnInit {
  public user$ = this.authFacade.user$;
  public isAdmin$ = this.authFacade.isAdmin$;
  public loggedIn$ = this.authFacade.isLoggedIn$;

  public activeQuizzes$: Observable<Quiz[]> = this.quizFacade.activeQuizzes$;

  public constructor(
    private quizFacade: QuizFacade,
    private authFacade: AuthFacade
  ) {}

  public ngOnInit() {
    this.quizFacade.getAll();
  }

  public logIn() {
    this.authFacade.loginWithGoogle();
  }
}
