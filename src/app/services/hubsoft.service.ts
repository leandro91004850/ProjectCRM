import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_CONFIG_HUBSOFT } from '../config/api.hubsoft';
import { API_CONFIG } from '../config/api.config';

interface ApiResponse {
  status: string;
  usuario: Usuario;
}

interface Usuario {
  imagem: Imagem;
}

interface Imagem {
  link: string;
  link_thumb: string;
}

@Injectable({
  providedIn: 'root'
})
export class HubsoftService {

  constructor(private http: HttpClient) { }

  getImagem(): Observable<ApiResponse> {
   return this.http.get<ApiResponse>(`${API_CONFIG.baseUrl}/imagem_perfil`)
  }

  
}