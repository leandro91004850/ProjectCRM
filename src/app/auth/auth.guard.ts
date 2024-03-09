import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})

// responsável por proteger as rotas da aplicação
export class AuthGuard implements CanActivate {

  constructor(private authservice: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
      let authenticated = this.authservice.EstaAutenticado();

      //se o usuário estiver autenticado, retorna true, caso contrário, redireciona para a página de login
      if(authenticated){
        return true;
      }else{
        this.router.navigate(['login']);
        return false
      }
    }
  
}
