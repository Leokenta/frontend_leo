import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../fornecedor.model';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-read',
  templateUrl: './fornecedor-read.component.html',
  styleUrls: ['./fornecedor-read.component.css']
})
export class FornecedorReadComponent implements OnInit {

  filtro: string = '';
  fornecedores: Fornecedor[] = [];
  fornecedoresFiltrados: Fornecedor[] = [];
  displayedColumns = ['forId', 'forNomeFantasia', 'forCnpj', 'forRazaoSocial','forTelefone', 'action'];

  constructor(private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.fornecedorService.read().subscribe(fornecedores => {
      this.fornecedores = fornecedores;
      this.fornecedoresFiltrados = fornecedores;
    });
  }

  aplicarFiltro(): void {
    const filtroLower = this.filtro.toLowerCase();
    this.fornecedoresFiltrados = this.fornecedores.filter(fornecedor =>
      fornecedor.forNomeFantasia.toLowerCase().includes(filtroLower) ||
      fornecedor.forCnpj.toLowerCase().includes(filtroLower) ||
      fornecedor.forRazaoSocial.toLowerCase().includes(filtroLower) ||
      fornecedor.forTelefone.toLowerCase().includes(filtroLower)
    );
  }

}
