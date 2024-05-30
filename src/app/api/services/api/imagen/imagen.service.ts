import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../auth/storage.service';
import { Imagen } from 'src/app/api/models/imagen/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private apiUrl = `${environment.apiUrl}/imagenes`;

  constructor(private http: HttpClient, private storageService: StorageService) {}

  private getHeaders(): HttpHeaders {
    const token = this.storageService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createImagen(file: File): Observable<number> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<number>(this.apiUrl, formData, { headers: this.getHeaders() });
  }

  getImagenes(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getImagen(imageId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${imageId}`, { responseType: 'blob', headers: this.getHeaders() });
  }

  updateImagen(imageId: number, file: File): Observable<Imagen> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put<Imagen>(`${this.apiUrl}/${imageId}`, formData, { headers: this.getHeaders() });
  }

  deleteImagen(imageId: number): Observable<Imagen> {
    return this.http.delete<Imagen>(`${this.apiUrl}/${imageId}`, { headers: this.getHeaders() });
  }
}
