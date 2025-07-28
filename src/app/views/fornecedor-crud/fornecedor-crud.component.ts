import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fornecedor } from 'src/app/components/fornecedor/fornecedor.model';
import { FornecedorService } from 'src/app/components/fornecedor/fornecedor.service';


@Component({
  selector: 'app-fornecedor-crud',
  templateUrl: './fornecedor-crud.component.html',
  styleUrls: ['./fornecedor-crud.component.css']
})
export class FornecedorCrudComponent implements OnInit {

  busca: string = '';
  fornecedores: Fornecedor[] = [];
  fornecedoresFiltrados: Fornecedor[] = [];

  constructor(private router: Router, private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.fornecedorService.read().subscribe((fornecedores: Fornecedor[]) => {
      this.fornecedores = fornecedores;
      this.fornecedoresFiltrados = fornecedores;
    });
  }

  navigateToFornecedorCreate(): void {
    this.router.navigate(['/fornecedores/create']);
  }

  filtrarFornecedores(): void {
    const filtroLower = this.busca.toLowerCase();
    this.fornecedoresFiltrados = this.fornecedores.filter(fornecedor =>
      fornecedor.forNomeFantasia.toLowerCase().includes(filtroLower) ||
      fornecedor.forCnpj.toLowerCase().includes(filtroLower) ||
      fornecedor.forRazaoSocial.toLowerCase().includes(filtroLower) ||
      fornecedor.forTelefone.toLowerCase().includes(filtroLower)
    );
  }
}
