import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/components/cliente/cliente.model';
import { ClienteService } from 'src/app/components/cliente/cliente.service';


@Component({
  selector: 'app-cliente-crud',
  templateUrl: './cliente-crud.component.html',
  styleUrls: ['./cliente-crud.component.css']
})
export class ClienteCrudComponent implements OnInit {

  busca: string = '';
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];

  constructor(private router: Router, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.read().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
      this.clientesFiltrados = clientes;
    });
  }

  navigateToClienteCreate(): void {
    this.router.navigate(['/clientes/create']);
  }

  filtrarClientes(): void {
    const filtroLower = this.busca.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(cliente =>
      cliente.cliNome.toLowerCase().includes(filtroLower) ||
      cliente.cliCpf.toLowerCase().includes(filtroLower) ||
      cliente.cliEmail.toLowerCase().includes(filtroLower) ||
      cliente.cliTelefone.toLowerCase().includes(filtroLower)
    );
  }
}
