import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloProducto } from '../modelos/producto.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:3000';
  token = '';

  constructor(private http: HttpClient, private seguridaServicio: SeguridadService) {
    this.token = this.seguridaServicio.ObtenerToken();
  }

  ObtenerRegistros(): Observable<ModeloProducto[]>{
    return this.http.get<ModeloProducto[]>(`${this.url}/producto-servicios`)
  }

  CrearProducto(producto: ModeloProducto): Observable<ModeloProducto>{
    return this.http.post<ModeloProducto>(`${this.url}/producto-servicios`, producto, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  ActualizarProducto(producto: ModeloProducto): Observable<ModeloProducto>{
    return this.http.put<ModeloProducto>(`${this.url}/producto-servicios`, producto, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarProducto(id: String): Observable<any>{
    return this.http.delete(`${this.url}/producto-servicios/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
}
