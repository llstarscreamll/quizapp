import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthFacade } from "../+state/auth.facade";
import { take, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  public constructor(private authFacade: AuthFacade, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authFacade.isAdmin$.pipe(
      take(1),
      tap(result => (!result ? this.router.navigateByUrl("/") : null))
    );
  }
}
