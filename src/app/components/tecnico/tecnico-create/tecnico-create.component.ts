import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Tecnico } from 'src/app/models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {
  
  tecnico: Tecnico = {
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
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  
  create(): void{
    this.service.create(this.tecnico).subscribe(() => {
      this.toast.success('Cadastrado realizado com sucesso', 'Cadastro', {timeOut: 7000});
      this.router.navigate(['tecnicos'])
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
    if(this.tecnico.perfis.includes(codigoPerfil)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(codigoPerfil), 1); // remove o perfil
      console.log(this.tecnico.perfis);
    }else{
      this.tecnico.perfis.push(codigoPerfil);
      console.log(this.tecnico.perfis);
    }

  }

  validaCampos(): boolean{
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  
  }

}
