import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./containers/landing-page/landing-page.component";
import { QuizzesPageComponent } from "./containers/quizzes-page/quizzes.component";
import { EditQuizPageComponent } from "./containers/edit-quiz-page/edit-quiz-page.component";
import { TakeQuizPageComponent } from "./containers/take-quiz-page/take-quiz-page.component";
import { QuizMetricsPageComponent } from "./containers/quiz-metrics-page/quiz-metrics-page.component";
import { AdminGuard } from "./guards/admin.guard";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", component: LandingPageComponent },
  {
    path: "quizzes",
    component: QuizzesPageComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "quizzes/:id",
    component: EditQuizPageComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "quizzes/:id/take",
    component: TakeQuizPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "quizzes/:id/metrics",
    component: QuizMetricsPageComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
