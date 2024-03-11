import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
  
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
    
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  
  create(): void{
    this.service.create(this.cliente).subscribe(() => {
      this.toast.success('Cadastrado realizado com sucesso', 'Cadastro', {timeOut: 7000});
      this.router.navigate(['clientes'])
    }, exception => {
      console.log(exception);
      if(exception.error.errors){
          exception.error.errors.forEach((element: any) => {
            this.toast.error(element.message, "Cadastro", {timeOut: 7000});
          })
      }else{
          this.toast.error(exception.error.message , "Cadastro", {timeOut: 7000});
      }
    })
  }

  addPerfil(codigoPerfil: any): void{
    if(this.cliente.perfis.includes(codigoPerfil)){
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(codigoPerfil), 1); // remove o perfil
      console.log(this.cliente.perfis);
    }else{
      this.cliente.perfis.push(codigoPerfil);
      console.log(this.cliente.perfis);
    }

  }

  validaCampos(): boolean{
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  
  }

}
