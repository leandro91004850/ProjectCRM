import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
     const tokenHubsoft = localStorage.getItem('tokenHubsoft')
      return this.http.get<ApiResponse>(`${API_CONFIG.baseUrl}/hubtel/api/hubsoft/imagem_perfil/${tokenHubsoft}`);
  }

  
}