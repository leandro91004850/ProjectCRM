import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HubsoftService } from 'src/app/services/hubsoft.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  imagemLink: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private hubsoftService: HubsoftService,
    private toast: ToastrService) { }


  ngOnInit(): void {
    this.router.navigate(['/home']);
  }

  logout(){
    this.router.navigate(['login'])
    this.authService.logout(); //limpa o token do localstorage
    this.toast.info('Logout realizado com sucesso', 'Logout', {timeOut: 7000})
  }

  getImagem(){
    this.hubsoftService.getImagem().subscribe(resposta => {
      this.imagemLink = resposta;
    })
  }


}
