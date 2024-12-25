import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { HubsoftService } from 'src/app/services/hubsoft.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ClientesCidade } from 'src/app/models/clientesCidade';

@Component({
  selector: 'app-clientes-cidade',
  templateUrl: './clientes-cidade.component.html',
  styleUrls: ['./clientes-cidade.component.css']
})
export class ClientesCidadeComponent implements OnInit {

  ELEMENT_DATA: ClientesCidade[] = []

  displayedColumns: string[] = ['regiao', 'servico_habilitado', 'suspenso_parcialmente', 'suspenso_pedido_cliente', 'aguardando_instalacao', 'suspenso_debito', 'aguardando_migracao', 'total', 'data_atualizacao'];
  dataSource = new MatTableDataSource<ClientesCidade>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: HubsoftService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.spinner.show();
    setTimeout(() => {
      this.service.findAllClientesCidade().subscribe(resposta => {
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