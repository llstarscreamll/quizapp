import { Component } from "@angular/core";
import { AuthFacade } from "./+state/auth.facade";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public user$ = this.authFacade.user$;
  public isLoggedIn$ = this.authFacade.isLoggedIn$;

  public constructor(private authFacade: AuthFacade) {}
}
