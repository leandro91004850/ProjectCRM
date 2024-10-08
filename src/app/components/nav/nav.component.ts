import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HubsoftService } from 'src/app/services/hubsoft.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  name: string | null = '';
  email: string | null = '';
  imagemLink: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private hubsoftService: HubsoftService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    const userInfo = this.getUserInfo();
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.getAvatar();
  }

  logout() {
    this.router.navigate(['login']);
    this.authService.logout(); // limpa o token do localstorage
    this.toast.info('Logout realizado com sucesso', 'Logout', { timeOut: 7000 });
  }

  getAvatar() {
    this.hubsoftService.getImagem().subscribe(resposta => {
      this.imagemLink = resposta.usuario.imagem.link;
    });
  }

  getUserInfo() {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    return { name, email };
  }
}