import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../auth/storage.service';
import { Pelicula } from 'src/app/api/models/pelicula/pelicula';

@Injectable({
    providedIn: 'root',
})
export class PeliculaService {
    private apiUrl = environment.apiUrl + '/peliculas';

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

    createPelicula(Pelicula: Pelicula): Observable<Pelicula> {
        return this.http.post<Pelicula>(this.apiUrl, Pelicula, {
            headers: this.getHeaders(),
        });
    }

    getPeliculas(): Observable<Pelicula[]> {
        return this.http.get<Pelicula[]>(this.apiUrl, {
            headers: this.getHeaders(),
        });
    }

    getPelicula(id: number): Observable<Pelicula> {
        return this.http.get<Pelicula>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders(),
        });
    }

    updatePelicula(pelicula: Pelicula): Observable<Pelicula> {
        return this.http.put<Pelicula>(
            `${this.apiUrl}/${pelicula.pelicula_id}`,
            pelicula
        );
    }

    deletePelicula(id: number): Observable<Pelicula> {
        return this.http.delete<Pelicula>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders(),
        });
    }
}
