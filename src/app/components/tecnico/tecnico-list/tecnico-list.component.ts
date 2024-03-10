import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css'],
})

export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = []

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: TecnicoService,
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

