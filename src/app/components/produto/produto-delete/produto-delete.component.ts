import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../produto.model';
import { FornecedorService } from '../../fornecedor/fornecedor.service'; // Adicionando o serviço de fornecedores
import { Fornecedor } from '../../fornecedor/fornecedor.model'; // Importando o modelo de fornecedor

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {

  produto!: Produto;
  fornecedoresFiltrados: Fornecedor[] = [];
  fornecedorNomeSelecionado: string = '';
  precoCustoStr: string = '';
  precoVendaStr: string = '';

  constructor(
    private produtoService: ProdutoService, 
    private router: Router,
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService // Injetando o serviço de fornecedores
  ) { }

  ngOnInit(): void {
    const prodId = this.route.snapshot.paramMap.get('prodId');
    this.produtoService.readById(prodId!).subscribe(produto => {
      this.produto = produto;
      this.precoCustoStr = produto.prodPrecoCusto.toFixed(2); // Convertendo para string com 2 casas decimais
      this.precoVendaStr = produto.prodPrecoVenda.toFixed(2); // Convertendo para string com 2 casas decimais
    });
  }

  deleteProduto(): void {
    this.produtoService.delete(this.produto.prodId!).subscribe(() => {
      this.produtoService.showMessage('Produto excluído com sucesso!');
      this.router.navigate(['/produtos']);
    });
  }

  cancel(): void {
    this.router.navigate(['/produtos']);
  }

  // Método para filtrar fornecedores
  filtrarFornecedores(): void {
    if (this.fornecedorNomeSelecionado.trim()) {
      this.fornecedorService.searchByName(this.fornecedorNomeSelecionado).subscribe(fornecedores => {
        this.fornecedoresFiltrados = fornecedores;
      });
    } else {
      this.fornecedoresFiltrados = [];
    }
  }

  // Método para selecionar um fornecedor
  selecionarFornecedor(nome: string): void {
    this.fornecedorNomeSelecionado = nome;
  }
}
