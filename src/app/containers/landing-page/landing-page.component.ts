import { Papa } from "ngx-papaparse";
import { Component, OnInit } from "@angular/core";
import { AuthFacade } from "src/app/+state/auth.facade";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"]
})
export class LandingPageComponent implements OnInit {
  public user$ = this.authFacade.user$;
  public isAdmin$ = this.authFacade.isAdmin$;
  public loggedIn$ = this.authFacade.isLoggedIn$;

  public constructor(private authFacade: AuthFacade) {}

  public ngOnInit() {}

  public logIn() {
    this.authFacade.loginWithGoogle();
  }
}
