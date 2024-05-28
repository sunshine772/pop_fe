import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../auth/storage.service';
import { Comentario } from 'src/app/api/models/comentario/comentario';

@Injectable({
    providedIn: 'root',
})
export class ComentarioService {
    private apiUrl = environment.apiUrl + '/comentarios';

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

    createComentario(Comentario: Comentario): Observable<Comentario> {
        return this.http.post<Comentario>(this.apiUrl, Comentario, {
            headers: this.getHeaders(),
        });
    }

    getComentarios(): Observable<Comentario[]> {
        return this.http.get<Comentario[]>(this.apiUrl, {
            headers: this.getHeaders(),
        });
    }

    getComentario(id: number): Observable<Comentario> {
        return this.http.get<Comentario>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders(),
        });
    }

    updateComentario(id: number, Comentario: Comentario): Observable<Comentario> {
        return this.http.put<Comentario>(`${this.apiUrl}/${id}`, Comentario, {
            headers: this.getHeaders(),
        });
    }

    deleteComentario(id: number): Observable<Comentario> {
        return this.http.delete<Comentario>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders(),
        });
    }
}
