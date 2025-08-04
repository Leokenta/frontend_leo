import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-read',
  templateUrl: './produto-read.component.html',
  styleUrls: ['./produto-read.component.css']
})
export class ProdutoReadComponent implements OnInit {

  filtro: string = '';
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  displayedColumns = [
    'prodId',
    'prodNome',
    'prodPrecoCusto',
    'prodPrecoVenda',
    'prodQtdEstoque',
    'prodCategoria',
    'prodMarca',
    'action'
  ];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.read().subscribe(produtos => {
      this.produtos = produtos;
      this.produtosFiltrados = produtos;
    });
  }

  aplicarFiltro(): void {
    const filtroLower = this.filtro.toLowerCase();

    this.produtosFiltrados = this.produtos.filter(produto =>
      produto.prodNome.toLowerCase().includes(filtroLower) ||
      produto.prodPrecoCusto.toString().includes(filtroLower) ||
      produto.prodPrecoVenda.toString().includes(filtroLower) ||
      produto.prodQtdEstoque.toString().includes(filtroLower) ||
      produto.prodCategoria.toLowerCase().includes(filtroLower) ||
      produto.prodMarca.toLowerCase().includes(filtroLower)
    );
  }
}
