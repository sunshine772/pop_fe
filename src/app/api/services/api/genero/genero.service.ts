import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../auth/storage.service';
import { Genero } from 'src/app/api/models/genero/genero';

@Injectable({
    providedIn: 'root',
})
export class GeneroService {
    private apiUrl = environment.apiUrl + '/generos';

    constructor(
        private http: HttpClient,
        private storageService: StorageService
    ) {}

    private getHeaders(): HttpHeaders {
        const token = this.storageService.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        });
    }

    createGenero(genero: Genero): Observable<Genero> {
        return this.http.post<Genero>(this.apiUrl, genero, {
            headers: this.getHeaders(),
        });
    }

    getGeneros(): Observable<Genero[]> {
        return this.http.get<Genero[]>(this.apiUrl, {
            headers: this.getHeaders(),
        });
    }

    getGenero(id: number): Observable<Genero> {
        return this.http.get<Genero>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders(),
        });
    }

    updateGenero(id: number, genero: Genero): Observable<Genero> {
        return this.http.put<Genero>(`${this.apiUrl}/${id}`, genero, {
            headers: this.getHeaders(),
        });
    }

    deleteGenero(id: number): Observable<Genero> {
        return this.http.delete<Genero>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders(),
        });
    }
}
