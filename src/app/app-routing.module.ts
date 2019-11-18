import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./containers/landing-page/landing-page.component";
import { QuizzesPageComponent } from "./containers/quizzes-page/quizzes.component";
import { EditQuizPageComponent } from "./containers/edit-quiz-page/edit-quiz-page.component";
import { TakeQuizPageComponent } from "./containers/take-quiz-page/take-quiz-page.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: LandingPageComponent },
  { path: "quizzes", component: QuizzesPageComponent },
  { path: "quizzes/:id", component: EditQuizPageComponent },
  { path: "quizzes/:id/take", component: TakeQuizPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
