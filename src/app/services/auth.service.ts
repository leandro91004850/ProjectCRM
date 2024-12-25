import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_CONFIG } from '../config/api.config';
import { Credenciais } from '../models/Credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();
  
  constructor(private http: HttpClient) { }

  authenticate(creds: Credenciais){
    return this.http.post(`${API_CONFIG.baseUrl}/api_hubtel/auth/login`, creds, {
      observe: 'response',
      responseType:'text'
    })
  }

  successfullLogin(token: string, tokenHubsoft: string, name: string, email: string){
    localStorage.setItem('token', token); //salva o token no localstorage
    localStorage.setItem('tokenHubsoft', tokenHubsoft); //salva o tokenHubsoft no localstorage
    localStorage.setItem('name', name); //salva o nome no localstorage
    localStorage.setItem('email', email); //salva o email no
  }
  
  EstaAutenticado(){
    let token = localStorage.getItem('token')
    if(token != null){
      return !this.jwtService.isTokenExpired(token) 
    }
    return false;
  }

  logout(){
    localStorage.clear();
  }


}
