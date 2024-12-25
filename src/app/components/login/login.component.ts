import { Component, OnInit } from '@angular/core';
import { Credenciais } from 'src/app/models/Credenciais';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  creds: Credenciais = {
    username: '',
    password: ''
  }

  username = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(8));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logar(){
      this.service.authenticate(this.creds).subscribe(resposta => {
        console.log(resposta);
        const responseBody = JSON.parse(resposta.body);
        const token = responseBody.token;
        const tokenHubsoft = responseBody.tokenHubsoft;
        const name = responseBody.name;
        const email = responseBody.email;
        this.service.successfullLogin(token, tokenHubsoft, name, email);
        this.router.navigate(['clientes_cidade']);
        this.toast.success('Logado com sucesso', 'Login', {timeOut: 7000});
      }, () => {
        this.toast.error('Usuário ou senha inválidos');
      });
  }


  validaCampos(): boolean {
    if(this.username.valid && this.password.valid){
      return true;
    }else{
      return false;
    }
  }


}
