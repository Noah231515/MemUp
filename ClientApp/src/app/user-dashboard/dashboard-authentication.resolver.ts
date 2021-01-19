import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardAuthenticationResolver implements Resolve<Boolean> {

  constructor(private authorizeService: AuthorizeService) { }

  /**
   * Gets the user's authentication status
   * @param route
   * @param state
   */
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Boolean> {
    return this.authorizeService.isAuthenticated()
        .pipe(take(1));
  }
}
