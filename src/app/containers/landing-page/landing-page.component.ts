import { Component, OnInit } from "@angular/core";
import { AuthFacade } from "src/app/+state/auth.facade";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"]
})
export class LandingPageComponent implements OnInit {
  constructor(private authFacade: AuthFacade, private db: AngularFirestore) {}

  ngOnInit() {}

  logIn() {
    this.authFacade.loginWithGoogle();
  }
}
