import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../auth/storage.service';
import { Etiqueta } from 'src/app/api/models/etiqueta/etiqueta';

@Injectable({
    providedIn: 'root',
})
export class EtiquetaService {
    private apiUrl = environment.apiUrl + '/etiquetas';

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

    createEtiqueta(Etiqueta: Etiqueta): Observable<Etiqueta> {
        return this.http.post<Etiqueta>(this.apiUrl, Etiqueta, {
            headers: this.getHeaders(),
        });
    }

    getEtiquetas(): Observable<Etiqueta[]> {
        return this.http.get<Etiqueta[]>(this.apiUrl, {
            headers: this.getHeaders(),
        });
    }

    getEtiqueta(id: number): Observable<Etiqueta> {
        return this.http.get<Etiqueta>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders(),
        });
    }

    updateEtiqueta(id: number, Etiqueta: Etiqueta): Observable<Etiqueta> {
        return this.http.put<Etiqueta>(`${this.apiUrl}/${id}`, Etiqueta, {
            headers: this.getHeaders(),
        });
    }

    deleteEtiqueta(id: number): Observable<Etiqueta> {
        return this.http.delete<Etiqueta>(`${this.apiUrl}/${id}`, {
            headers: this.getHeaders(),
        });
    }
}
