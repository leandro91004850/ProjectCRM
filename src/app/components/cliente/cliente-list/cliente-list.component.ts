import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})

export class ClienteListComponent implements OnInit {

  ELEMENT_DATA: Cliente[] = []

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ClienteService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.spinner.show();
    setTimeout(() => {
      this.service.findAll().subscribe(resposta => {
        this.ELEMENT_DATA = resposta;
        this.dataSource.data = resposta;
        this.dataSource.paginator = this.paginator;
        console.log(this.ELEMENT_DATA);
        this.spinner.hide();
      });
    });
  }

  applyFilter(event: Event) { // metodo do filtro
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

