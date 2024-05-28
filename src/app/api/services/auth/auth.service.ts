import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = environment.apiUrl + '/auth';

    constructor(
        private http: HttpClient,
        private storageService: StorageService,
        private router: Router
    ) {}

    login(username: string, password: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        return this.http.post<any>(`${this.apiUrl}/login`, body.toString(), {
            headers,
        });
    }

    logout(): Observable<any> {
        const token = this.storageService.getToken();
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
        this.storageService.clean();
        this.router.navigate(['/auth/login']);
        return this.http.post<any>(`${this.apiUrl}/logout`, {}, { headers });
    }
}
