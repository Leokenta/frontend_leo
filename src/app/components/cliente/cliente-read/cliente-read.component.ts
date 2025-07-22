import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements OnInit {

  filtro: string = '';
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  displayedColumns = ['cliId', 'cliNome', 'cliCpf', 'cliEmail', 'cliTelefone', 'action'];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.read().subscribe(clientes => {
      this.clientes = clientes;
      this.clientesFiltrados = clientes;
    });
  }

  aplicarFiltro(): void {
    const filtroLower = this.filtro.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(cliente =>
      cliente.cliNome.toLowerCase().includes(filtroLower) ||
      cliente.cliCpf.toLowerCase().includes(filtroLower) ||
      cliente.cliEmail.toLowerCase().includes(filtroLower) ||
      cliente.cliTelefone.toLowerCase().includes(filtroLower)
    );
  }

}
