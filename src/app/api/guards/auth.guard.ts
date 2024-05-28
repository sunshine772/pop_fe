import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/auth/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private storageService: StorageService, private router: Router, private jwtHelper: JwtHelperService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = this.storageService.getToken();
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        } else {
            this.storageService.clean();
            this.router.navigate(['/auth/login']);
            return false;
        }
    }
}
